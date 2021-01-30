import React from 'react'
import { buildEmptyGrid } from './cellDeclarations'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'

const grid = buildEmptyGrid({
  columns: 20,
  rows: 20,
})

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
