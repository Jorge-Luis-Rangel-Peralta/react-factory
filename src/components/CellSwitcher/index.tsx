import React from 'react'
import { Cell } from '../../types/CellTypes'
import EmptyCell from '../EmptyCell'

type Props = {
    cell: Cell;
}

const CellSwicher: React.FC<Props> = ({
    cell,
}) => {
    switch (cell.type) {
    default:
        return <EmptyCell />
    }
}

export default CellSwicher