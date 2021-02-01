import { CellCoordinate, CellType } from '../types/CellTypes'
import { emptyCell } from './cellDeclarations'
import putCoordinate from './putCoordinate'

it('Should add to the end when no index is added to args', () => {
    const coordinates: CellCoordinate<CellType>[] = [
        { cell: emptyCell, column: 0, row: 0 },
    ]

    const newCoordinates = putCoordinate({
        column: 10,
        row: 10,
    })(coordinates)(emptyCell)

    expect(newCoordinates.length).toBe(2)
    expect(newCoordinates[1]).toStrictEqual({
        column: 10,
        row: 10,
        cell: emptyCell,
    })
})
