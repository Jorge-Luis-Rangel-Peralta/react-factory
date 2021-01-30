import React from 'react'
import { CellType, CellTypes } from '../../types/CellTypes'
import EmptyCell from '../EmptyCell'
import ConveyorCell from '../ConveyorCell'
import { ErrorCell } from './style'

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
    default:
        return <ErrorCell />
    }
}

export default CellSwicher