import React from 'react'
import { ConveyorCellType } from '../../types/CellTypes'
import { Frame } from './style'

type Props = {
    cell: ConveyorCellType;
}

const ConveyorCell: React.FC<Props> = ({
    cell,
}) => (
    <Frame direction={cell.direction}>
    </Frame>
)

export default ConveyorCell
