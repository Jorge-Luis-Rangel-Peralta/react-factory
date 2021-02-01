import { ContainerCell } from "../types/CellTypes";

const cellIsContainerCell = (cell: unknown): cell is ContainerCell => {
    if (typeof cell !== 'object') {
        return false
    }
    if (cell === null) {
        return false
    }

    const isContainer = (cell as Record<string, unknown>).isContainer

    if (isContainer === true) {
        return true
    }

    return false
}

export default cellIsContainerCell
