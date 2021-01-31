import React from 'react'
import { ConveyorCellType } from '../../types/CellTypes'
import { Frame } from './style'

type Props = {
    cell: ConveyorCellType;
    onClick?: () => void;
}

const ConveyorCell: React.FC<Props> = ({
    cell,
    onClick,
}) => (
    <Frame
        direction={cell.direction}
        isOn={cell.isOn}
        imageUrl="textures/conveyor.png"
        onClick={onClick}
    />
)

export default ConveyorCell
