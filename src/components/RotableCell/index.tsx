import styled from 'styled-components'
import { CellDirections } from '../../types/CellTypes'
import CellBaseWithImage from '../CellBaseWithImage'

const RotableCell = styled(CellBaseWithImage)<{
    direction: CellDirections;
}>`
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

export default RotableCell
