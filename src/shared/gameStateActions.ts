export enum ActionTypeEnum {
    CLOCK_TICK,
    CELL_CLICKED,
}

export const clockTick = {
    type: ActionTypeEnum.CLOCK_TICK,
} as const

export const cellClicked = (row: number, column: number) => ({
    type: ActionTypeEnum.CELL_CLICKED,
    payload: { row, column },
} as const)

export type GameStateAction = typeof clockTick
    | ReturnType<typeof cellClicked>