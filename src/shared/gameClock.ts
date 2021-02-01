import { clockTickAction, GameStateAction } from "./gameStateActions"

const makeATick = (dispatch: React.Dispatch<GameStateAction>) => {
    requestAnimationFrame(() => {
        dispatch(clockTickAction)
        setTimeout(() => {
            makeATick(dispatch)
        }, 300)
    })
}

let hasStartedTicking = false

export const startTicking = (dispatch: React.Dispatch<GameStateAction>) => {
    if (!hasStartedTicking) {
        hasStartedTicking = true
        console.log('Start ticking')
        makeATick(dispatch)
    }
}
