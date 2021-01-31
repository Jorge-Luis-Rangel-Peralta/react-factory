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
}

type BaseConsumingCell = BaseCell & {
    isOn: boolean;
    energyConsumption: number;
}

export type EmptyCellType = BaseCell & {
    type: CellTypes.EMPTY;
}

export type ConveyorCellType = BaseConsumingCell & {
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
    currentEnergy: number;
}

export type CellType = EmptyCellType
    | ConveyorCellType
    | BatteryCellType
    | GasGeneratorCellType

