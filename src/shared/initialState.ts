import { buildEmptyGrid } from "./buildEmptyGrid";
import { GameStateType, UiStatesEnum } from "./gameStateReducer";

const initialState: GameStateType = {
    money: 2000,
    uiState: UiStatesEnum.IDLE,
    grid: buildEmptyGrid({
        columns: 20,
        rows: 20,
    }),
    generators: [],
    batteries: [],
    conveyors: [],
    drills: [],
}

export default initialState