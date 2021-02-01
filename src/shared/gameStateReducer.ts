import { CellCoordinate, BaseConsumingCell, BatteryCellType, CellType, CellsEnum, ConveyorCellType, GasGeneratorCellType, DrillCellType, CellDirections } from "../types/CellTypes"
import cellIsContainerCell from "./cellIsContainerCell"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"
import updateGridsCell from "./updateGridsCell"

export enum UiStatesEnum {
    IDLE,
    ADD_CELL,
}

export type CellsState = {
    grid: CellType[][];
    generators: CellCoordinate<GasGeneratorCellType>[];
    batteries: CellCoordinate<BatteryCellType>[];
    conveyors: CellCoordinate<ConveyorCellType>[];
    drills: CellCoordinate<DrillCellType>[];
}

export type GameStateType = CellsState & {
    money: number;
    uiState: UiStatesEnum;
    cellToAdd?: CellType;
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
            return {
                ...state,
                ...updateGridsCell(state)({
                    column: action.payload.column,
                    row: action.payload.row,
                })(cellToAdd),
                uiState: UiStatesEnum.IDLE,
                money: state.money - cellToAdd.price,
            }
        }
        return state
    case ActionTypeEnum.CLOCK_TICK:
        let energyGenerated = 0

        let newState = state

        type UpdateArgs = {
            coordinate: CellCoordinate<CellType>;
            cell: CellType;
        }

        const updateStateCell = (args: UpdateArgs) => {
            newState = {
                ...newState,
                ...updateGridsCell(newState)({
                    column: args.coordinate.column,
                    row: args.coordinate.row,
                    index: args.coordinate.index,
                })(args.cell),
            }
        }

        newState.generators.forEach((coordinate) => {
            const generator = coordinate.cell
            if (generator.gas <= 0) {
                return
            }

            const energyGeneratedByThis = generator.energyGeneratedPerGasUnit
                * generator.gasBurnedPerTick
            energyGenerated += energyGeneratedByThis

            const newGenerator = {
                ...generator,
                gas: generator.gas - generator.gasBurnedPerTick
            }

            updateStateCell({
                coordinate,
                cell: newGenerator,
            })
        })

        newState.batteries.forEach((coordinate) => {
            const battery = coordinate.cell

            if (energyGenerated === 0 || battery.currentEnergy === battery.capacity) {
                return
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

            updateStateCell({
                coordinate,
                cell: chargedBattery,
            })
        })

        const getBatteryEnergy = () => newState.batteries
            .reduce((total, battery) => battery.cell.currentEnergy + total, 0)

        const getEnergyFromBatteries = (energy: number) => {
            let energyLeftToRemove = energy
            newState.batteries.forEach((coordinate) => {
                if (energyLeftToRemove === 0) {
                    return
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

                updateStateCell({
                    coordinate,
                    cell: battery,
                })
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

        const getNeighbor = <T extends CellType>(
            coordinate: CellCoordinate<T>,
            direction: CellDirections,
        ): CellCoordinate<CellType> | undefined => {
            switch(direction) {
            case CellDirections.DOWN:
                const neighborRow = coordinate.row + 1

                if (neighborRow > newState.grid.length) {
                    return undefined
                }

                const cell = newState.grid[neighborRow][coordinate.column]

                if (!cell) {
                    return undefined
                }

                return { cell, column: coordinate.column, row: neighborRow }
            default:
                return undefined
            }
        }

        newState.conveyors.forEach((coordinate, coordinateIndex) => {
            let conveyor = consumeEnergy(coordinate.cell)

            if (conveyor.ticksCount >= conveyor.ticksToMove) {
                switch (conveyor.direction) {
                case CellDirections.DOWN:
                    conveyor = {
                        ...conveyor,
                        containedItems: {
                            bottom: [
                                ...conveyor.containedItems.left,
                                ...conveyor.containedItems.right,
                                ...conveyor.containedItems.center,
                            ],
                            left: [],
                            right: [],
                            center: conveyor.containedItems.top,
                            top: [],
                        },
                    }
                    break
                }
                conveyor = { ...conveyor, ticksCount: 0 }
            } else {
                conveyor = { ...conveyor, ticksCount: conveyor.ticksCount + 1 }
            }

            updateStateCell({
                coordinate,
                cell: conveyor,
            })
        })

        newState.drills.forEach((coordinate) => {
            let drill = consumeEnergy(coordinate.cell)

            if (drill.isOn) {
                const currentCount = drill.ticksCount
                if (currentCount >= drill.ticksToProduce) {
                    drill = { ...drill, ticksCount: 0 }
                    const neighborCoordinate = getNeighbor(coordinate, drill.direction)

                    if (neighborCoordinate) {
                        const targetPosition = drill.direction === CellDirections.DOWN
                            ? 'top'
                            : drill.direction === CellDirections.UP
                            ? 'bottom'
                            : drill.direction === CellDirections.LEFT
                            ? 'right'
                            : drill.direction === CellDirections.RIGHT
                            ? 'left'
                            : undefined

                        if (cellIsContainerCell(neighborCoordinate.cell) && targetPosition) {
                            updateStateCell({
                                coordinate: neighborCoordinate,
                                cell: {
                                    ...neighborCoordinate.cell,
                                    containedItems: {
                                        ...neighborCoordinate.cell.containedItems,
                                        [targetPosition]: [
                                            ...neighborCoordinate.cell.containedItems[targetPosition],
                                            drill.producingItem,
                                        ],
                                    },
                                },
                            })
                        }
                    }
                } else {
                    drill = { ...drill, ticksCount: drill.ticksCount + 1 }
                }
            }

            updateStateCell({
                coordinate,
                cell: drill,
            })
        })

        return newState
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
