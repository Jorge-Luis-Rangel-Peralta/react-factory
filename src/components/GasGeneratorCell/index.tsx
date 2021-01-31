import React from 'react'
import CellBaseWithImage from '../CellBaseWithImage'
import { GasGeneratorCellType } from '../../types/CellTypes'

type Props = {
    cell: GasGeneratorCellType;
    onClick?: () => void;
}

const GasGeneratorCell: React.FC<Props> = ({
    cell,
    onClick,
}) => (
    <CellBaseWithImage
        imageUrl="textures/basicGasGenerator.png"
        isOn
        onClick={onClick}
    />
)

export default GasGeneratorCell
