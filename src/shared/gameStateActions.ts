export enum ActionTypeEnum {
    CLOCK_TICK,
}

export const clockTick = {
    type: ActionTypeEnum.CLOCK_TICK,
} as const

export type GameStateAction = typeof clockTick