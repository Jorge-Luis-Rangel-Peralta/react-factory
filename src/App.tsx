import React from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
import { Cell } from './types/CellTypes'

const emptyCell = {
  type: 'empty'
} as const

const grid: Cell[][] = [
  [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
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
