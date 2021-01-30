import React from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
import {
  Cell,
  ConveyorCell,
  CellDirections,
  CellTypes,
} from './types/CellTypes'

const conveyor: ConveyorCell = {
  type: CellTypes.CONVEYOR,
  direction: CellDirections.RIGHT,
}

const emptyCell = {
  type: CellTypes.EMPTY,
} as const

const grid: Cell[][] = [
  [emptyCell, emptyCell, conveyor, emptyCell, emptyCell],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
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
