import { buildEmptyGrid } from "./buildEmptyGrid";
import { GameStateType, UiStatesEnum } from "./gameStateReducer";

const initialState: GameStateType = {
    money: 1000,
    uiState: UiStatesEnum.IDLE,
    grid: buildEmptyGrid({
        columns: 20,
        rows: 20,
    }),
}

export default initialState