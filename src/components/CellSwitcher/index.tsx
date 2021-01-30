import React from 'react'
import { CellType, CellTypes } from '../../types/CellTypes'
import EmptyCell from '../EmptyCell'
import ConveyorCell from '../ConveyorCell'
import { ErrorCell } from './style'
import GasGeneratorCell from '../GasGeneratorCell'

type Props = {
    cell: CellType;
}

const CellSwicher: React.FC<Props> = ({
    cell,
}) => {
    switch (cell.type) {
    case CellTypes.CONVEYOR:
        return <ConveyorCell cell={cell} />
    case CellTypes.EMPTY:
        return <EmptyCell />
    case CellTypes.GAS_GENERATOR:
        return <GasGeneratorCell cell={cell} />
    default:
        return <ErrorCell />
    }
}

export default CellSwicher