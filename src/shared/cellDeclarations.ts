import {
    BatteryCellType,
    CellDirections,
    CellTypes,
    ConveyorCellType,
    EmptyCellType,
    GasGeneratorCellType,
} from "../types/CellTypes";

export const emptyCell: EmptyCellType = {
    price: 0,
    type: CellTypes.EMPTY,
    energyConsumption: 0,
}

export const conveyorUp: ConveyorCellType = {
    price: 10,
    type: CellTypes.CONVEYOR,
    direction: CellDirections.UP,
    energyConsumption: 1,
}

export const conveyorDown: ConveyorCellType = {
    price: 10,
    type: CellTypes.CONVEYOR,
    direction: CellDirections.DOWN,
    energyConsumption: 1,
}

export const conveyorLeft: ConveyorCellType = {
    price: 10,
    type: CellTypes.CONVEYOR,
    direction: CellDirections.LEFT,
    energyConsumption: 1,
}

export const conveyorRigth: ConveyorCellType = {
    price: 10,
    type: CellTypes.CONVEYOR,
    energyConsumption: 1,
    direction: CellDirections.RIGHT,
}

export const basicGasGenerator: GasGeneratorCellType = {
    price: 500,
    type: CellTypes.GAS_GENERATOR,
    energyConsumption: 0,
    gas: 1000,
    gasCapacity: 1000,
    gasBurnedPerTick: 1,
    energyGeneratedPerGasUnit: 1,
}

export const basicBattery: BatteryCellType = {
    price: 500,
    type: CellTypes.BATTERY,
    energyConsumption: 0,
    capacity: 100,
}
