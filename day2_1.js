const isInvalidId = (id) => {
    if (id.length % 2 !== 0) {
        return false
    }
    const stringMiddle = id.length / 2
    const firstPart = id.slice(0, stringMiddle)
    const secondPart = id.slice(stringMiddle)
    return firstPart === secondPart
}

const getRangeLimits = (range) => {
  const [start, end] = range.split('-')
  return {
    start: Number(start),
    end: Number(end)
  }
}

const checkRangeForInvalidIds = (range) => {
  const { start, end } = getRangeLimits(range)
  for (let id = start; id <= end; id++) {
    const invalidId = isInvalidId(id.toString())
    if (invalidId) {
      invalidIds.push(id)
    }
  }
}

// Get all ranges and create array from ranges. They are separated by ','
const ranges = document.querySelector('pre').innerHTML.split(',');

// Itterate over ranges to find invalidIds
const invalidIds = []
ranges.forEach((range) => {
  checkRangeForInvalidIds(range)
})

invalidIds.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
