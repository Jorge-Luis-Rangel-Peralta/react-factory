import React, { useEffect, useReducer } from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
import ToolsFrame from './components/ToolsFrame'
import { basicGasGenerator, conveyorRigth } from './shared/cellDeclarations'
import { clockTick, GameStateAction } from './shared/gameStateActions'
import gameStateReducer from './shared/gameStateReducer'
import initialState from './shared/initialState'

const makeATick = (dispatch: React.Dispatch<GameStateAction>) => {
    requestAnimationFrame(() => {
        dispatch(clockTick)
        setTimeout(() => {
            makeATick(dispatch)
        }, 1000)
    })
}

let hasStartedTicking = false

const startTicking = (dispatch: React.Dispatch<GameStateAction>) => {
    if (!hasStartedTicking) {
        hasStartedTicking = true
        console.log('Start ticking')
        makeATick(dispatch)
    }
}

const App = () => {
    const [state, dispatch] = useReducer(gameStateReducer, initialState)

    useEffect(() => {
        startTicking(dispatch)
    }, [])

    return (
        <AppFrame
            slotTools={(
                <ToolsFrame>
                    <div>Money: {state.money}</div>
                    <div>
                        <CellSwicher cell={conveyorRigth} />
                        <CellSwicher cell={basicGasGenerator} />
                    </div>
                </ToolsFrame>
            )}
            slotView={(
                <CellsGrid>
                    {state.grid.map((row, rowNumber) => (
                        <CellsRow key={rowNumber}>
                            {row.map((cell, cellNumber) => (
                                <CellSwicher key={cellNumber} cell={cell} />
                            ))}
                        </CellsRow>
                    ))}
                </CellsGrid>
            )}
        />
    )
}

export default App;
