import React from 'react'
import CellBaseWithImage from '../CellBaseWithImage'
import { BatteryCellType } from '../../types/CellTypes'

type Props = {
    cell: BatteryCellType;
    onClick?: () => void;
}

const BatteryCell: React.FC<Props> = ({
    cell,
    onClick,
}) => (
    <CellBaseWithImage
        imageUrl="textures/basicBattery.png"
        onClick={onClick}
    />
)

export default BatteryCell
