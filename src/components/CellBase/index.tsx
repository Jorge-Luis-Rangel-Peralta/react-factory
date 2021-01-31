import styled from 'styled-components'

const CellBase = styled.div<{
    isOn: boolean;
}>`
    width: 60px;
    height: 60px;
    max-width: 60px;
    max-height: 60px;
    opacity: ${({ isOn }) => isOn ? 1 : 0.3}
`

export default CellBase
