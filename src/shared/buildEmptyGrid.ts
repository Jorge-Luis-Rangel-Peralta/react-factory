import { emptyCell } from "./cellDeclarations"
import { CellType } from "../types/CellTypes"

type Args = {
    columns: number;
    rows: number;
}

export const buildEmptyGrid = ({ columns, rows }: Args) => {
    const grid: CellType[][] = []

    for (let rowNumber = 0; rowNumber < rows; rowNumber += 1) {
        const row: CellType[] = []

        for (let columnNumber = 0; columnNumber < columns; columnNumber += 1) {
            row.push(emptyCell)
        }

        grid.push(row)
    }

    return grid
}
