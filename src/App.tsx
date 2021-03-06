import React, { useCallback, useEffect, useReducer } from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
import ToolsFrame from './components/ToolsFrame'
import { basicBattery, basicDrill, basicGasGenerator, conveyor } from './shared/cellDeclarations'
import { cellClickedActionBuilder, CellClickedPayload, prepareCellToAddActionBuilder } from './shared/gameStateActions'
import { startTicking } from './shared/gameClock'
import gameStateReducer from './shared/gameStateReducer'
import initialState from './shared/initialState'
import { CellType } from './types/CellTypes'

const availableCells = [
    basicDrill,
    conveyor,
    basicGasGenerator,
    basicBattery,
]

const App = () => {
    const [state, dispatch] = useReducer(gameStateReducer, initialState)

    useEffect(() => {
        startTicking(dispatch)
    }, [])

    const prepareCellToAdd = useCallback((cell: CellType) => {
        dispatch(prepareCellToAddActionBuilder(cell))
    }, [])

    const cellClicked = useCallback((payload: CellClickedPayload) => {
        dispatch(cellClickedActionBuilder(payload))
    }, [])

    return (
        <AppFrame
            slotTools={(
                <ToolsFrame>
                    <div>Money: {state.money}</div>
                    <div>
                        {availableCells.map((availableCell, index) => (
                            <CellSwicher
                                key={index}
                                cell={availableCell}
                                onClick={() => prepareCellToAdd(availableCell)}
                            />
                        ))}
                    </div>
                </ToolsFrame>
            )}
            slotView={(
                <CellsGrid>
                    {state.grid.map((row, rowNumber) => (
                        <CellsRow key={rowNumber}>
                            {row.map((cell, columnNumber) => (
                                <CellSwicher
                                    key={columnNumber}
                                    cell={cell}
                                    onClick={() => cellClicked({
                                        cell,
                                        column: columnNumber,
                                        row: rowNumber,
                                    })}
                                />
                            ))}
                        </CellsRow>
                    ))}
                </CellsGrid>
            )}
        />
    )
}

export default App;
