export enum CellTypes {
    EMPTY,
    CONVEYOR,
}

export enum CellDirections {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

type BaseCell = {
    energyConsumption: number;
}

export type EmptyCellType = BaseCell & {
    type: CellTypes.EMPTY;
}

export type ConveyorCellType = BaseCell & {
    type: CellTypes.CONVEYOR;
    direction: CellDirections;
}

export type Cell = EmptyCellType | ConveyorCellType
