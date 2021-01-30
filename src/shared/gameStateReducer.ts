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
        if (state.energy === 0) {
            return state
        }

        const energyConsumed = state.grid.reduce((total, row) => {
            let newTotal = total
            row.forEach((cell) => {
                newTotal = newTotal + cell.energyConsumption
            })
            return newTotal
        }, 0)

        const energyAfterConsumption = state.energy - energyConsumed

        return {
            ...state,
            energy: energyAfterConsumption >= 0 ? energyAfterConsumption : 0,
        }
    default:
        throw new Error(`Invalid action type`)
    }
}

export default gameStateReducer
