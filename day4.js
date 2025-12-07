const exampleShelves = [
  '..@@.@@@@.',
  '@@@.@.@.@@',
  '@@@@@.@.@@',
  '@.@@@@..@.',
  '@@.@@@@.@@',
  '.@@@@@@@.@',
  '.@.@.@.@@@',
  '@.@@@.@@@@',
  '.@@@@@@@@.',
  '@.@.@@@.@.'
]

const getAdjacentPositions = (shelves, currentRowIndex, currentColumnIndex) => {
  const columnIndexes = [currentColumnIndex - 1, currentColumnIndex, currentColumnIndex + 1]
  const rowIndexes = [currentRowIndex - 1, currentRowIndex + 1, currentRowIndex]
  const adjacentPositionValues = rowIndexes.map((rowIndex) => {
    if (rowIndex < 0) return
    if (rowIndex === currentRowIndex) {
      columnIndexes.splice(1,1)
    }
    return getShelfValuesForIndexes(shelves[rowIndex], columnIndexes)
  })
  return adjacentPositionValues
}

const getShelfValuesForIndexes = (shelf, indexes) => {
  shelfValues = indexes.map((ind) => {
    if (ind < 0 || !shelf) return
    return shelf[ind]
  })
  return shelfValues
}

const getSumOfAdjacentRollsOfPaper = (adjacentPositionValues) => {
  const adjacentRollsOfPaperCount = adjacentPositionValues.flat().reduce((accumulator, currentVal) => {
    return currentVal === "@" ? accumulator += 1 : accumulator
  }, 0)
  return adjacentRollsOfPaperCount
}

const shelves = document.querySelector('pre').innerHTML.trim().split('\n');
let removableRollsOfPaperSum = 0
shelves.forEach((shelf, rowIndex, shelves) => {
  shelf.split('').forEach((position, columnIndex) => {
    if (position !== '@') {
      return
    }
    const adjacentPositionValues = getAdjacentPositions(shelves, rowIndex, columnIndex)
    const adjacentRollsOfPaperSum = getSumOfAdjacentRollsOfPaper(adjacentPositionValues)
    if (adjacentRollsOfPaperSum < 4) {
      removableRollsOfPaperSum += 1
    }
  })
})

console.log("🚀 ~ removableRollsOfPaperSum:", removableRollsOfPaperSum)



// Asnwers
// 1543
