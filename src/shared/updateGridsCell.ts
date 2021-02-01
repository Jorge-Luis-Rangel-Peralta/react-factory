import { CellsEnum, CellType } from '../types/CellTypes'
import { CellsState } from './gameStateReducer'
import putCoordinate from './putCoordinate'
import replaceGridCell from './replaceGridCell'

type Args = {
    column: number;
    row: number;
    index?: number;
}

const updateGridsCell = (
    state: CellsState,
) => (
    args: Args,
) => (cellToAdd: CellType) => {
    const newGrid = replaceGridCell({
        column: args.column,
        row: args.row,
        grid: state.grid,
        newCell: cellToAdd,
    })

    const addCoordinate = putCoordinate(args)

    const newState = {
        ...state,
        grid: newGrid,
    }

    switch (cellToAdd.type) {
        case CellsEnum.GAS_GENERATOR:
            newState.generators = addCoordinate(newState.generators)(cellToAdd)
            break
        case CellsEnum.BATTERY:
            newState.batteries = addCoordinate(newState.batteries)(cellToAdd)
            break
        case CellsEnum.CONVEYOR:
            newState.conveyors = addCoordinate(newState.conveyors)(cellToAdd)
            break
        case CellsEnum.DRILL:
            newState.drills = addCoordinate(newState.drills)(cellToAdd)
            break
        default:
            return state
        }

    return newState
}

export default updateGridsCell
