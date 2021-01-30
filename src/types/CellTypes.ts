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

export type EmptyCellType = {
    type: CellTypes.EMPTY;
}

export type ConveyorCellType = {
    type: CellTypes.CONVEYOR;
    direction: CellDirections;
}

export type Cell = EmptyCellType | ConveyorCellType
