import { CellType, CellTypes } from "../types/CellTypes"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"

export enum UiStatesEnum {
    IDLE,
    ADD_CELL,
}

export type GameStateType = {
    money: number;
    uiState: UiStatesEnum;
    cellToAdd?: CellType;
    grid: CellType[][];
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
            return {
                ...state,
                uiState: UiStatesEnum.IDLE,
                money: state.money - cellToAdd.price,
                grid: state.grid.map((row, rowIndex) => {
                    if (rowIndex !== action.payload.row) {
                        return row
                    }
                    return row.map((internalCell, columnIndex) => {
                        if (columnIndex !== action.payload.column) {
                            return internalCell
                        }
                        return cellToAdd
                    })
                }),
            }
        }
        return state
    case ActionTypeEnum.CLOCK_TICK:
        let energyGenerated = 0

        const grid = state.grid.map((row) => row.map((cell) => {
            switch (cell.type) {
            case CellTypes.GAS_GENERATOR:
                if (cell.gas < 0) {
                    break
                }
                console.log('generator gas', cell.gas)
                const energyGeneratedByThis = cell.energyGeneratedPerGasUnit * cell.gasBurnedPerTick
                energyGenerated += energyGeneratedByThis

                return {
                    ...cell,
                    gas: cell.gas - cell.gasBurnedPerTick
                }
            }
            return cell
        }))

        console.log('energyGenerated', energyGenerated)

        return {
            ...state,
            grid,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
