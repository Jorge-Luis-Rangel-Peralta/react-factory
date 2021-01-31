import { CellType } from "../types/CellTypes"

export enum ActionTypeEnum {
    CLOCK_TICK,
    CELL_CLICKED,
    PREPARE_CELL_TO_BE_ADDED,
}

export const clockTickAction = {
    type: ActionTypeEnum.CLOCK_TICK,
} as const

export type CellClickedPayload = {
    row: number;
    column: number;
    cell: CellType;
}

export const cellClickedActionBuilder = (payload: CellClickedPayload) => ({
    type: ActionTypeEnum.CELL_CLICKED,
    payload,
} as const)

export const prepareCellToAddActionBuilder = (cell: CellType) => ({
    type: ActionTypeEnum.PREPARE_CELL_TO_BE_ADDED,
    payload: cell,
} as const)

export type GameStateAction = typeof clockTickAction
    | ReturnType<typeof cellClickedActionBuilder>
    | ReturnType<typeof prepareCellToAddActionBuilder>