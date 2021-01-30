import React from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import EmptyCell from './components/EmptyCell'

const grid = [
  [{}, {}, {}],
  [{}, {}, {}],
  [{}, {}, {}],
  [{}, {}, {}],
  [{}, {}, {}],
]

const App = () => (
  <AppFrame
    slotView={(
      <CellsGrid>
        {grid.map((row) => (
          <CellsRow>
            {row.map((cell) => (
              <EmptyCell />
            ))}
          </CellsRow>
        ))}
      </CellsGrid>
    )}
  />
)

export default App;
