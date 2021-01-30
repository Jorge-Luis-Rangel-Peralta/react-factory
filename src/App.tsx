import React, { useEffect, useReducer } from 'react'
import AppFrame from './components/AppFrame'
import CellsGrid from './components/CellsGrid'
import CellsRow from './components/CellsRow'
import CellSwicher from './components/CellSwitcher'
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

const App = () => {
    const [state, dispatch] = useReducer(gameStateReducer, initialState)

    useEffect(() => {
        makeATick(dispatch)
    }, [])

    return (
        <AppFrame
            slotTools={(
                <div>Energy: {state.energy}</div>
            )}
            slotView={(
                <CellsGrid>
                    {state.grid.map((row) => (
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
}

export default App;
