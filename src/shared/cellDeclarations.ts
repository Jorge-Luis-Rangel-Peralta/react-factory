import {
    BatteryCellType,
    CellDirections,
    CellsEnum,
    ConveyorCellType,
    DrillCellType,
    EmptyCellType,
    GasGeneratorCellType,
    ItemsEnum,
} from "../types/CellTypes";

export const emptyCell: EmptyCellType = {
    price: 0,
    type: CellsEnum.EMPTY,
}

export const conveyor: ConveyorCellType = {
    price: 10,
    type: CellsEnum.CONVEYOR,
    direction: CellDirections.DOWN,
    isOn: true,
    energyConsumption: 1,
}

export const basicGasGenerator: GasGeneratorCellType = {
    price: 500,
    type: CellsEnum.GAS_GENERATOR,
    gas: 1000,
    gasCapacity: 1000,
    gasBurnedPerTick: 1,
    energyGeneratedPerGasUnit: 2,
}

export const basicBattery: BatteryCellType = {
    price: 500,
    type: CellsEnum.BATTERY,
    capacity: 20,
    currentEnergy: 0,
}

export const basicDrill: DrillCellType = {
    price: 1000,
    direction: CellDirections.DOWN,
    energyConsumption: 1,
    isOn: true,
    type: CellsEnum.DRILL,
    producingItem: ItemsEnum.CRUDE_OIL_JAR,
    ticksToProduce: 10,
    ticksCount: 0,
}
