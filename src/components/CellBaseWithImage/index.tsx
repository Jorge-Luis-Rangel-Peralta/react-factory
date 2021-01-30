import styled from 'styled-components'
import CellBase from '../CellBase'

const CellBaseWithImage = styled(CellBase)<{
    imageUrl: string;
}>`
    background-color: lightgray;
    border-style: dotted;
    border-width: 1px;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: contain;
`

export default CellBaseWithImage
