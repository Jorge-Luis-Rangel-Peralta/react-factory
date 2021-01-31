import React from 'react'
import { CellType, CellTypes } from '../../types/CellTypes'
import EmptyCell from '../EmptyCell'
import ConveyorCell from '../ConveyorCell'
import { ErrorCell } from './style'
import GasGeneratorCell from '../GasGeneratorCell'

type Props = {
    cell: CellType;
    onClick?: () => void;
}

const CellSwicher: React.FC<Props> = ({
    cell,
    onClick,
}) => {
    switch (cell.type) {
    case CellTypes.CONVEYOR:
        return <ConveyorCell cell={cell} onClick={onClick} />
    case CellTypes.EMPTY:
        return <EmptyCell onClick={onClick} />
    case CellTypes.GAS_GENERATOR:
        return <GasGeneratorCell cell={cell} onClick={onClick} />
    default:
        return <ErrorCell onClick={onClick} />
    }
}

export default CellSwicher