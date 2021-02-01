import React from 'react'
import { ConveyorCellType } from '../../types/CellTypes'
import CellItem from '../CellItem'
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
    >
        {cell.containedItems.top.map((item, index) => (
            <CellItem key={`top${index}`} position="top" />
        ))}
        {cell.containedItems.center.map((item, index) => (
            <CellItem key={`center${index}`} position="center" />
        ))}
        {cell.containedItems.bottom.map((item, index) => (
            <CellItem key={`bottom${index}`} position="bottom" />
        ))}
    </RotableCell>
)

export default ConveyorCell
