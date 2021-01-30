import styled from 'styled-components'
import { CellDirections } from '../../types/CellTypes'
import CellBase from '../CellBase'

export const Frame = styled(CellBase)<{
    direction: CellDirections;
}>`
    background-color: lightgray;
    border-style: dotted;
    border-width: 1px;
    background-image: url(textures/conveyor.png);
    background-size: contain;
    transform: rotate(${({ direction }) => {
        switch (direction) {
        case CellDirections.UP:
            return -90
        case CellDirections.LEFT:
            return 180
        case CellDirections.DOWN:
            return 90
        default:
            return 0
        }
    }}deg);
`
