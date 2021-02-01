import styled from 'styled-components'

const CellItem = styled.div<{
    position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}>`
    position: absolute;
    top: ${({ position }) => {
        switch (position) {
        case 'center':
            return 20
        }
        return 0
    }}px;
    left: ${({ position }) => {
        switch (position) {
        case 'top':
        case 'center':
            return 20
        }
        return 0
    }}px;
    width: 20px;
    height: 20px;
    background-color: red;
`

export default CellItem
