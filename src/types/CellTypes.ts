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

export type EmptyCell = {
    type: CellTypes.EMPTY;
}

export type ConveyorCell = {
    type: CellTypes.CONVEYOR;
    direction: CellDirections;
}

export type Cell = EmptyCell | ConveyorCell
