import { CellType, CellTypes, GasGeneratorCellType } from "../types/CellTypes"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"
import replaceGridCell from "./replaceGridCell"

export enum UiStatesEnum {
    IDLE,
    ADD_CELL,
}

type CellCoordinates<T extends CellType> = { row: number; column: number; cell: T }

export type GameStateType = {
    money: number;
    uiState: UiStatesEnum;
    cellToAdd?: CellType;
    grid: CellType[][];
    generators: CellCoordinates<GasGeneratorCellType>[];
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
            && action.payload.cell.type === CellTypes.EMPTY
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

            if (cellToAdd.type === CellTypes.GAS_GENERATOR) {
                newState.generators = [
                    ...newState.generators,
                    {
                        cell: cellToAdd,
                        column: action.payload.column,
                        row: action.payload.row,
                    },
                ]
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

        grid = state.grid.map((row) => row.map((cell) => {
            if (
                cell.type !== CellTypes.BATTERY
                || energyGenerated === 0
                || cell.currentEnergy === cell.capacity 
            ) {
                return cell
            }

            const needdedToFill = cell.capacity - cell.currentEnergy

            if (needdedToFill > energyGenerated) {
                const chargedBattery = {
                    ...cell,
                    currentEnergy: cell.currentEnergy + energyGenerated,
                }
                energyGenerated = 0
                return chargedBattery
            }

            energyGenerated -= needdedToFill

            const chargedBattery = {
                ...cell,
                currentEnergy: cell.capacity,
            }
            return chargedBattery
        }))

        return {
            ...state,
            grid,
            generators,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
