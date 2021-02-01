import React from 'react'
import { ConveyorCellType } from '../../types/CellTypes'
import RotableCell from '../RotableCell'

type Props = {
    cell: ConveyorCellType;
    onClick?: () => void;
}

const ConveyorCell: React.FC<Props> = ({
    cell,
    onClick,
}) => (
    <RotableCell
        direction={cell.direction}
        isOn={cell.isOn}
        imageUrl="textures/conveyor.png"
        onClick={onClick}
    />
)

export default ConveyorCell
