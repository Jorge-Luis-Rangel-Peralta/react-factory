import styled from 'styled-components'
import { CellDirections } from '../../types/CellTypes'
import CellBaseWithImage from '../CellBaseWithImage'

export const ImageRotated = styled(CellBaseWithImage)<{
    direction: CellDirections;
}>`
    position: absolute;
    left: 0;
    right: 0;
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
