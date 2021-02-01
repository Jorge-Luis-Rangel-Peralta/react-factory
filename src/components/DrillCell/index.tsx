import React from 'react'
import { DrillCellType } from '../../types/CellTypes'
import RotableCell from '../RotableCell'

type Props = {
    cell: DrillCellType;
    onClick?: () => void;
}

const DrillCell: React.FC<Props> = ({
    cell,
    onClick,
}) => (
    <RotableCell
        direction={cell.direction}
        isOn={cell.isOn}
        imageUrl="textures/drill.png"
        onClick={onClick}
    />
)

export default DrillCell
