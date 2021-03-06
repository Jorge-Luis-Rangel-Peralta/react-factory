import { CellCoordinate, CellType } from "../types/CellTypes"
import valueIsUndefined from "./valueIsUndefined"

type Args = {
    column: number;
    row: number;
    index?: number;
}

const putCoordinate = (
    args: Args,
) => <T extends CellType>(
    coordinates: CellCoordinate<T>[],
) => (cell: T) => {
    const newCoordinate = {
        column: args.column,
        row: args.row,
        index: args.index,
        cell,
    }

    if (valueIsUndefined(newCoordinate.index)) {
        newCoordinate.index = coordinates.length
        return [
            ...coordinates,
            newCoordinate,
        ]
    }

    if (newCoordinate.index >= coordinates.length) {
        throw new Error(`putCoordinate should have an index already in the array, to add element use index: undefined instead`)
    }

    return [
        ...coordinates.slice(0, args.index),
        newCoordinate,
        ...coordinates.slice(newCoordinate.index + 1),
    ]
}

export default putCoordinate
