import { BatteryCellType, CellType, CellsEnum, ConveyorCellType, GasGeneratorCellType } from "../types/CellTypes"
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
            default:
                return state
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

        console.log('energyGenerated', energyGenerated)
        console.log('energyOnBatteries', getBatteryEnergy())

        const conveyors = state.conveyors.map((coordinate) => {
            let conveyor = coordinate.cell
            if (energyGenerated >= conveyor.energyConsumption) {
                energyGenerated -= conveyor.energyConsumption
                if (!conveyor.isOn) {
                    conveyor = { ...conveyor, isOn: true }
                }
            } else if (getBatteryEnergy() >= conveyor.energyConsumption) {
                getEnergyFromBatteries(conveyor.energyConsumption)
                if (!conveyor.isOn) {
                    conveyor = { ...conveyor, isOn: true }
                }
            } else if (conveyor.isOn) {
                conveyor = { ...conveyor, isOn: false }
            }

            if (coordinate.cell !== conveyor) {
                grid = replaceGridCell({
                    column: coordinate.column,
                    row: coordinate.row,
                    grid,
                    newCell: conveyor,
                })

                return {
                    ...coordinate,
                    cell: conveyor,
                }
            } else {
                return coordinate
            }
        })

        return {
            ...state,
            grid,
            generators,
            batteries,
            conveyors,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
