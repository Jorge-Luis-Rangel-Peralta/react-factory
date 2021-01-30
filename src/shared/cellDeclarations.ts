import { CellDirections, CellTypes, ConveyorCellType, EmptyCellType } from "../types/CellTypes";

export const emptyCell: EmptyCellType = {
    type: CellTypes.EMPTY,
    energyConsumption: 0,
}

export const conveyorUp: ConveyorCellType = {
    type: CellTypes.CONVEYOR,
    direction: CellDirections.UP,
    energyConsumption: 1,
}

export const conveyorDown: ConveyorCellType = {
    type: CellTypes.CONVEYOR,
    direction: CellDirections.DOWN,
    energyConsumption: 1,
}

export const conveyorLeft: ConveyorCellType = {
    type: CellTypes.CONVEYOR,
    direction: CellDirections.LEFT,
    energyConsumption: 1,
}

export const conveyorRigth: ConveyorCellType = {
    type: CellTypes.CONVEYOR,
    direction: CellDirections.RIGHT,
    energyConsumption: 1,
}
