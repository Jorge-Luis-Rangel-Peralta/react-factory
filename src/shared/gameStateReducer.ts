import { CellType } from "../types/CellTypes"
import { ActionTypeEnum, GameStateAction } from "./gameStateActions"

export type GameStateType = {
    energy: number;
    grid: CellType[][];
}

const gameStateReducer = (
    state: GameStateType,
    action: GameStateAction,
): GameStateType => {
    switch (action.type) {
    case ActionTypeEnum.CLOCK_TICK:
        return {
            ...state,
            energy: state.energy - 1,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
