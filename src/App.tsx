import React from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
import {
  Cell,
  ConveyorCellType,
  CellDirections,
  CellTypes,
} from './types/CellTypes'

const conveyor1: ConveyorCellType = {
  type: CellTypes.CONVEYOR,
  direction: CellDirections.UP,
}

const conveyor2: ConveyorCellType = {
  type: CellTypes.CONVEYOR,
  direction: CellDirections.DOWN,
}

const conveyor3: ConveyorCellType = {
  type: CellTypes.CONVEYOR,
  direction: CellDirections.LEFT,
}

const conveyor4: ConveyorCellType = {
  type: CellTypes.CONVEYOR,
  direction: CellDirections.RIGHT,
}

const emptyCell = {
  type: CellTypes.EMPTY,
} as const

const grid: Cell[][] = [
  [emptyCell, emptyCell, conveyor1, emptyCell, emptyCell],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
  [conveyor3, emptyCell, emptyCell, emptyCell, conveyor4],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
  [emptyCell, emptyCell, conveyor2, emptyCell, emptyCell],
]

const App = () => (
  <AppFrame
    slotView={(
      <CellsGrid>
        {grid.map((row) => (
          <CellsRow>
            {row.map((cell) => (
              <CellSwicher cell={cell} />
            ))}
          </CellsRow>
        ))}
      </CellsGrid>
    )}
  />
)

export default App;
