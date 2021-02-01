import React from 'react'
import { CellDirections } from '../../types/CellTypes'
import CellBase from '../CellBase'
import { ImageRotated } from './style'

type Props = {
    isOn: boolean;
    imageUrl: string;
    onClick?: () => void;
    direction: CellDirections;
}

const RotableCell: React.FC<Props> = ({
    isOn,
    imageUrl,
    onClick,
    direction,
    children,
}) => (
    <CellBase isOn={isOn} onClick={onClick}>
        <ImageRotated direction={direction} isOn={isOn} imageUrl={imageUrl} />
        {children}
    </CellBase>
)

export default RotableCell
