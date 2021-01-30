import { CellType } from "../types/CellTypes"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"

export enum UiStatesEnum {
    IDLE,
    ADD_CELL,
}

export type GameStateType = {
    money: number;
    uiState: UiStatesEnum;
    grid: CellType[][];
}

const gameStateReducer = (
    state: GameStateType,
    action: GameStateAction,
): GameStateType => {
    switch (action.type) {
    case ActionTypeEnum.CLOCK_TICK:
        const energyConsumed = state.grid.reduce((total, row) => {
            let newTotal = total
            row.forEach((cell) => {
                newTotal = newTotal + cell.energyConsumption
            })
            return newTotal
        }, 0)

        console.log('energyConsumed', energyConsumed)

        return state
    case ActionTypeEnum.CELL_CLICKED:
        return state
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
