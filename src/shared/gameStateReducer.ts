import { BaseConsumingCell, BatteryCellType, CellType, CellsEnum, ConveyorCellType, GasGeneratorCellType, DrillCellType } from "../types/CellTypes"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"
import replaceGridCell from "./replaceGridCell"

export enum UiStatesEnum {
    IDLE,
    ADD_CELL,
}

type CellCoordinate<T extends CellType> = { row: number; column: number; cell: T }

const addCoordinate = <T extends CellType>(coordinates: CellCoordinate<T>[]) => (coordinate: CellCoordinate<T>) => [
    ...coordinates,
    coordinate,
]

export type GameStateType = {
    money: number;
    uiState: UiStatesEnum;
    cellToAdd?: CellType;
    grid: CellType[][];
    generators: CellCoordinate<GasGeneratorCellType>[];
    batteries: CellCoordinate<BatteryCellType>[];
    conveyors: CellCoordinate<ConveyorCellType>[];
    drills: CellCoordinate<DrillCellType>[];
}

const gameStateReducer = (
    state: GameStateType,
    action: GameStateAction,
): GameStateType => {
    switch (action.type) {
    case ActionTypeEnum.PREPARE_CELL_TO_BE_ADDED:
        if (state.uiState !== UiStatesEnum.IDLE) {
            return state
        }
        return {
            ...state,
            uiState: UiStatesEnum.ADD_CELL,
            cellToAdd: action.payload,
        }
    case ActionTypeEnum.CELL_CLICKED:
        const { cellToAdd } = state

        if (!cellToAdd || state.money < cellToAdd.price) {
            return {
                ...state,
                uiState: UiStatesEnum.IDLE,
            }
        }

        if (
            state.uiState === UiStatesEnum.ADD_CELL
            && cellToAdd
            && action.payload.cell.type === CellsEnum.EMPTY
            && state.money >= cellToAdd.price
        ) {
            const newState = {
                ...state,
                uiState: UiStatesEnum.IDLE,
                money: state.money - cellToAdd.price,
                grid: replaceGridCell({
                    column: action.payload.column,
                    row: action.payload.row,
                    grid: state.grid,
                    newCell: cellToAdd,
                })
            }

            switch (cellToAdd.type) {
            case CellsEnum.GAS_GENERATOR:
                newState.generators = addCoordinate(newState.generators)({
                    cell: cellToAdd,
                    column: action.payload.column,
                    row: action.payload.row,
                })
                break
            case CellsEnum.BATTERY:
                newState.batteries = addCoordinate(newState.batteries)({
                    cell: cellToAdd,
                    column: action.payload.column,
                    row: action.payload.row,
                })
                break
            case CellsEnum.CONVEYOR:
                newState.conveyors = addCoordinate(newState.conveyors)({
                    cell: cellToAdd,
                    column: action.payload.column,
                    row: action.payload.row,
                })
                break
            case CellsEnum.DRILL:
                newState.drills = addCoordinate(newState.drills)({
                    cell: cellToAdd,
                    column: action.payload.column,
                    row: action.payload.row,
                })
                break
            default:
                return { ...state, uiState: UiStatesEnum.IDLE }
            }

            return newState
        }
        return state
    case ActionTypeEnum.CLOCK_TICK:
        let energyGenerated = 0

        let grid = state.grid

        const generators = state.generators.map((coordinate) => {
            const generator = coordinate.cell
            if (generator.gas < 0) {
                return coordinate
            }

            const energyGeneratedByThis = generator.energyGeneratedPerGasUnit
                * generator.gasBurnedPerTick
            energyGenerated += energyGeneratedByThis

            const newGenerator = {
                ...generator,
                gas: generator.gas - generator.gasBurnedPerTick
            }

            grid = replaceGridCell({
                column: coordinate.column,
                row: coordinate.row,
                newCell: newGenerator,
                grid,
            })

            return {
                ...coordinate,
                cell: newGenerator,
            }
        })

        let batteries = state.batteries.map((coordinate) => {
            const battery = coordinate.cell

            if (energyGenerated === 0 || battery.currentEnergy === battery.capacity) {
                return coordinate
            }

            const energyNeeddedToFill = battery.capacity - battery.currentEnergy

            let chargedBattery
            if (energyNeeddedToFill > energyGenerated) {
                chargedBattery = {
                    ...battery,
                    currentEnergy: battery.currentEnergy + energyGenerated,
                }
                energyGenerated = 0
            } else {
                chargedBattery = {
                    ...battery,
                    currentEnergy: battery.capacity,
                }
    
                energyGenerated -= energyNeeddedToFill
            }

            grid = replaceGridCell({
                column: coordinate.column,
                row: coordinate.row,
                grid,
                newCell: chargedBattery,
            })

            return {
                ...coordinate,
                cell: chargedBattery,
            }
        })

        const getBatteryEnergy = () => batteries
            .reduce((total, battery) => battery.cell.currentEnergy + total, 0)

        const getEnergyFromBatteries = (energy: number) => {
            let energyLeftToRemove = energy
            batteries = batteries.map((coordinate) => {
                if (energyLeftToRemove === 0) {
                    return coordinate
                }

                let battery = coordinate.cell

                if (energyLeftToRemove >= battery.currentEnergy) {
                    energyLeftToRemove -= battery.currentEnergy
                    battery = {
                        ...battery,
                        currentEnergy: 0,
                    }
                } else {
                    battery = {
                        ...battery,
                        currentEnergy: battery.currentEnergy - energyLeftToRemove,
                    }
                    energyLeftToRemove = 0
                }

                grid = replaceGridCell({
                    column: coordinate.column,
                    row: coordinate.row,
                    grid,
                    newCell: battery,
                })

                return {
                    ...coordinate,
                    cell: battery,
                }
            })
        }

        const consumeEnergy = <T extends BaseConsumingCell>(consumer: T) => {
            let newConsumer = consumer
            if (energyGenerated >= newConsumer.energyConsumption) {
                energyGenerated -= newConsumer.energyConsumption
                if (!newConsumer.isOn) {
                    newConsumer = { ...newConsumer, isOn: true }
                }
            } else if (getBatteryEnergy() >= newConsumer.energyConsumption) {
                getEnergyFromBatteries(newConsumer.energyConsumption)
                if (!newConsumer.isOn) {
                    newConsumer = { ...newConsumer, isOn: true }
                }
            } else if (newConsumer.isOn) {
                newConsumer = { ...newConsumer, isOn: false }
            }
            return newConsumer
        }

        const applyCellChange = <T extends CellType>(coordinate: CellCoordinate<T>, newCell: T) => {
            if (coordinate.cell !== newCell) {
                grid = replaceGridCell({
                    column: coordinate.column,
                    row: coordinate.row,
                    grid,
                    newCell: newCell,
                })

                return {
                    ...coordinate,
                    cell: newCell,
                }
            } else {
                return coordinate
            }
        }

        const conveyors = state.conveyors.map((coordinate) => {
            const conveyor = consumeEnergy(coordinate.cell)

            return applyCellChange(coordinate, conveyor)
        })

        const drills = state.drills.map((coordinate) => {
            const drill = consumeEnergy(coordinate.cell)

            if (drill.isOn) {
                console.log('Makes extraction')
            }

            return applyCellChange(coordinate, drill)
        })

        return {
            ...state,
            grid,
            generators,
            batteries,
            conveyors,
            drills,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
