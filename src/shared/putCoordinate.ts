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
    if (valueIsUndefined(args.index)) {
        return [
            ...coordinates,
            {
                column: args.column,
                row: args.row,
                cell,
            },
        ]
    }

    return coordinates
}

export default putCoordinate
