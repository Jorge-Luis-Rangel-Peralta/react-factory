import React from 'react'
import CellBaseWithImage from '../CellBaseWithImage'
import { GasGeneratorCellType } from '../../types/CellTypes'

type Props = {
    cell: GasGeneratorCellType;
}

const GasGeneratorCell: React.FC<Props> = ({
    cell,
}) => (
    <CellBaseWithImage
        imageUrl="textures/basicGasGenerator.png"
    />
)

export default GasGeneratorCell
