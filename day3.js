
// Set the first number as the largest for firstNumber and the second number as 0
// Compare it to the next number
// If we are at the last index, do not check to replace the firstNumber
// If currentNumber > firstNumber set firstNumber = currentNumber
// When we change firstNumber we also need to change the second number
// If not larger than firstNumber, check if larger for secondNumber
// If currentNumber > secondNumber, set secondNumber = currentNumber

// Instead of first and second number use an array

const findLargestCombinationInBank = (bank, numberOfDigits) => {
  const digitsArray = initializeDigitsArray(bank, numberOfDigits)
  let ind = 1
  while (ind < bank.length) {
    const remainingBankDigits = bank.length - ind + 1
    const currentDigit = bank[ind]
    addDigitToArray(digitsArray, currentDigit, remainingBankDigits)
    ind += 1
  }
  return Number(digitsArray.join(''))
}

const initializeDigitsArray = (bank, numberOfDigits) => {
  const bankFirstDigit = bank[0]
  const digitsArray = [bankFirstDigit]
  for (let i=1; i < numberOfDigits;i++) {
    digitsArray.push(0)
  }
  return digitsArray
}

const addDigitToArray = (arr, digit, remainingBankDigits) => {
  // Itterate the array to check if the current digit is larger that the any of the array's digits.
  // If we end up using the digit to replace an existing digit we need to set all following digits
  // to 0 and break out of the loop.
  // We should take into consideration the bank's current index because if there are only 4 digits
  // left to iterate in the bank sequence they cannot be used in places higher than the last 4 spots.
  const indexToStartIteration = remainingBankDigits > arr.length ? 0 : arr.length - remainingBankDigits + 1
  for (let i = indexToStartIteration; i < arr.length ; i++) {
    const currentDigit = arr[i]
    if (digit > currentDigit) {
      arr[i] = digit
      resetArrayAfterIndex(arr, i)
      break
    }
  }
}

const resetArrayAfterIndex = (arr, index) => {
  for (let i = index + 1; i < arr.length; i++) {
    arr[i] = 0
  }
}

const getArraySum = (arr) => {
  return arr.reduce((accumulator, current) => accumulator + current, 0)
}

// ======================================================================

const banks = document.querySelector('pre').innerHTML.trim().split('\n');

let largestPairs = []

banks.forEach((bank) => {
  const currentLargestPair = findLargestCombinationInBank(bank, 2)
  largestPairs.push(currentLargestPair)
})

const largestPairsSum = getArraySum(largestPairs)


// Answers
// Part1: 17427
// Part2: 173161749617495
// Wrong answers
// 17457
