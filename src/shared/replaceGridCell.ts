import { CellType } from '../types/CellTypes'

type Args = {
    grid: CellType[][];
    row: number;
    column: number;
    newCell: CellType;
}

const replaceGridCell = ({
    column: targetColumn,
    grid,
    newCell,
    row: targetRow,
}: Args) => grid.map((row, rowIndex) => {
    if (rowIndex !== targetRow) {
        return row
    }
    return row.map((internalCell, columnIndex) => {
        if (columnIndex !== targetColumn) {
            return internalCell
        }
        return newCell
    })
})

export default replaceGridCell
