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
        index: 1,
        cell: emptyCell,
    })
})

it('Should replace without mutation from array when index is added', () => {
    const coordinates: CellCoordinate<CellType>[] = [
        { cell: emptyCell, column: 0, row: 0 },
        { cell: emptyCell, column: 0, row: 1 },
        { cell: emptyCell, column: 0, row: 2 },
        { cell: emptyCell, column: 0, row: 3 },
    ]

    const newCoordinates = putCoordinate({
        column: 10,
        row: 10,
        index: 2,
    })(coordinates)(emptyCell)

    expect(newCoordinates.length).toBe(coordinates.length)
    expect(newCoordinates[2]).not.toBe(coordinates[2])
    expect(newCoordinates[2]).toStrictEqual({
        column: 10,
        row: 10,
        index: 2,
        cell: emptyCell,
    })
})

it('Should throw an error when the index provided does not exist on array', () => {
    const coordinates: CellCoordinate<CellType>[] = [
        { cell: emptyCell, column: 0, row: 0 },
    ]

    expect(() => {
        putCoordinate({
            column: 10,
            row: 10,
            index: 2,
        })(coordinates)(emptyCell)
    }).toThrowError()
})
