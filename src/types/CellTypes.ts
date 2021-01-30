export enum CellTypes {
    EMPTY,
    CONVEYOR,
    BATTERY,
    GAS_GENERATOR,
}

export enum CellDirections {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

type BaseCell = {
    price: number;
    energyConsumption: number;
}

export type EmptyCellType = BaseCell & {
    type: CellTypes.EMPTY;
}

export type ConveyorCellType = BaseCell & {
    type: CellTypes.CONVEYOR;
    direction: CellDirections;
}

export type GasGeneratorCellType = BaseCell & {
    type: CellTypes.GAS_GENERATOR,
    gas: number;
    gasCapacity: number;
    gasBurnedPerTick: number;
    energyGeneratedPerGasUnit: number;
}

export type BatteryCellType = BaseCell & {
    type: CellTypes.BATTERY;
    capacity: number;
}

export type CellType = EmptyCellType
    | ConveyorCellType
    | BatteryCellType
    | GasGeneratorCellType

