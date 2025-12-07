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

const removeRollsOfPaper = (shelves, positionsToRemove) => {
  Object.entries(positionsToRemove).forEach(([rowIndex, columnIndexes]) => {
    console.group()
    const currentShelf = shelves[rowIndex].split("")
    columnIndexes.forEach((columnIndex) => {
      currentShelf[columnIndex] = '.'
    })
    shelves[rowIndex] = currentShelf.join("")
    console.groupEnd()
  })
}

const findRemovableRollsOfPaper = (shelves) => {
  const positionsToRemove = {}

  shelves.forEach((shelf, rowIndex, shelves) => {
    positionsToRemove[rowIndex] = []
    shelf.split('').forEach((position, columnIndex) => {
      if (position !== '@') {
        return
      }
      const adjacentPositionValues = getAdjacentPositions(shelves, rowIndex, columnIndex)
      const adjacentRollsOfPaperSum = getSumOfAdjacentRollsOfPaper(adjacentPositionValues)
      if (adjacentRollsOfPaperSum < 4) {
        positionsToRemove[rowIndex].push(columnIndex)
      }
    })
  })
  return positionsToRemove
}

const shelves = document.querySelector('pre').innerHTML.trim().split('\n');

let noMorePaperRollsToRemove = false
let totalRemovableRollsOfPaperSum = 0

while (!noMorePaperRollsToRemove) {
  const positionsToRemove = findRemovableRollsOfPaper(shelves)
  const positionsToRemoveSum = Object.values(positionsToRemove).flat().length
  if (positionsToRemoveSum) {
    totalRemovableRollsOfPaperSum += positionsToRemoveSum
    removeRollsOfPaper(shelves,positionsToRemove)
  } else {
    noMorePaperRollsToRemove = true
  }
}

console.log("totalRemovableRollsOfPaperSum -->", totalRemovableRollsOfPaperSum)

// Answers
// 9038
