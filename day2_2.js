const getRangeLimits = (range) => {
  const [start, end] = range.split('-')
  return {
    start: Number(start),
    end: Number(end)
  }
}

const isInvalidIdWithPatterns = (id) => {
  // Create two pointers
  let left = 0
  let right = 1
  let lastPossibleIndex = id.length / 2 + 1

  // Move r until r === l or until one past the middle or until
  let idValid = false
  while (right <= lastPossibleIndex && !idValid) {
    // First check if the interval could be possible. For example in length: 9 an interval of 2 couldn't happen.
    let interval = right - left
    if (id.length % interval !== 0) {
      right += 1
      continue
    }
    let leftNumber = id[left]
    let rightNumber = id[right]
    // When r === l check their distance and look for groups of these intervals
    if (leftNumber === rightNumber) {
      // If the pattern matches all intervals the id is invalid.
      // If there is a mismatch the pattern does not match so we need to keep looking
      let patternToMatch = id.slice(0, interval)
      let slicedId = []
      for (let i = 0; i + interval <= id.length; i += interval){
        slicedId.push(id.slice(i, i + interval))
      }
      const foundMismatch = slicedId.some((currentPattern) => currentPattern !== patternToMatch)
      idValid = !foundMismatch
    }
    right += 1
  }

  return idValid
}

const checkRangeForInvalidIdsWithPatterns = (range) => {
  const { start, end } = getRangeLimits(range)
  for (let id = start; id <= end; id++) {
    const invalidId = isInvalidIdWithPatterns(id.toString())
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
  checkRangeForInvalidIdsWithPatterns(range)
})

invalidIds.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
