import React from 'react'
import { Cell, CellTypes } from '../../types/CellTypes'
import EmptyCell from '../EmptyCell'
import ConveyorCell from '../ConveyorCell'

type Props = {
    cell: Cell;
}

const CellSwicher: React.FC<Props> = ({
    cell,
}) => {
    switch (cell.type) {
    case CellTypes.CONVEYOR:
        return <ConveyorCell cell={cell} />
    default:
        return <EmptyCell />
    }
}

export default CellSwicher