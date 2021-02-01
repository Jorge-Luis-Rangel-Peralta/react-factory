export enum ItemsEnum {
    CRUDE_OIL_JAR,
}

export enum CellsEnum {
    EMPTY,
    CONVEYOR,
    BATTERY,
    GAS_GENERATOR,
    DRILL,
}

export enum CellDirections {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export type CellCoordinate<T extends CellType> = { row: number; column: number; cell: T }

type BaseCell = {
    price: number;
}

export type BaseConsumingCell = BaseCell & {
    isOn: boolean;
    energyConsumption: number;
}

export type DirectedCell = {
    direction: CellDirections;
}

export type ContainerCell = {
    containedItems: ItemsEnum[];
}

export type EmptyCellType = BaseCell & {
    type: CellsEnum.EMPTY;
}

export type ConveyorCellType = BaseConsumingCell & DirectedCell & ContainerCell & {
    type: CellsEnum.CONVEYOR;
}

export type DrillCellType = BaseConsumingCell & DirectedCell & {
    type: CellsEnum.DRILL;
    producingItem: ItemsEnum;
    ticksToProduce: number;
    ticksCount: number;
}

export type GasGeneratorCellType = BaseCell & {
    type: CellsEnum.GAS_GENERATOR,
    gas: number;
    gasCapacity: number;
    gasBurnedPerTick: number;
    energyGeneratedPerGasUnit: number;
}

export type BatteryCellType = BaseCell & {
    type: CellsEnum.BATTERY;
    capacity: number;
    currentEnergy: number;
}

export type CellType = EmptyCellType
    | ConveyorCellType
    | BatteryCellType
    | GasGeneratorCellType
    | DrillCellType

