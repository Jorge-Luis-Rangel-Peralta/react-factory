import { ContainerCell } from "../types/CellTypes";

const cellIsContainerCell = (cell: unknown): cell is ContainerCell => {
    if (typeof cell !== 'object') {
        return false
    }
    if (cell === null) {
        return false
    }

    const containedItems = (cell as Record<string, unknown>).containedItems

    if (Array.isArray(containedItems)) {
        return true
    }

    return false
}

export default cellIsContainerCell
