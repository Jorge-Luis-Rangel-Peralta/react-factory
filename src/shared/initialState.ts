import { buildEmptyGrid } from "./buildEmptyGrid";
import { GameStateType } from "./gameStateReducer";

const initialState: GameStateType = {
    energy: 0,
    grid: buildEmptyGrid({
        columns: 20,
        rows: 20,
    }),
}

export default initialState