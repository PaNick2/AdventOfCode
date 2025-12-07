  const startingPoint = 50
  // Get the directions
  const directions = document.querySelector('pre').innerHTML.trim().split('\n');
  const positions = []
  const calculateNewPosition = (start, step) => {
    const position = {
      start: start,
      newPosition: null,
      timesPointedToZero: 0
    }
    const directionModifier = step[0] === 'R' ? 1 : -1;
    position.distanceNumber = Number(step.slice(1))
    position.distanceToTravel = position.distanceNumber * directionModifier
    position.travelTo = start + position.distanceToTravel
    position.reductedTravelTo = position.travelTo % 100

    if (position.travelTo === 0 || Math.abs(position.travelTo) === 100) {
      position.newPosition = 0
    } else if (directionModifier < 0 && position.travelTo < 0) {
      position.newPosition = (100 + position.reductedTravelTo) % 100
    } else {
      position.newPosition = position.reductedTravelTo
    }

    // If travelTo is between 0 and 100, timesPointedToZero is 0
    if (position.travelTo > 0 && Math.abs(position.travelTo) < 100) {
      position.timesPointedToZero = 0
      // If travelTo is exactly 0 or exactly 100, timesPointedToZero is 1
    } else if (position.travelTo === 0 || position.travelTo === 100) {
      position.timesPointedToZero = 1
      // If we turn left and cross 0, timePointedToZero is at least 1 plus however many full laps we made
      // If we turn right and cross 100, timesPointedTozero is however many full laps we made
    } else {
      if (directionModifier < 0 && start !== 0) {
        position.timesPointedToZero += 1
      }
      position.timesPointedToZero += Math.floor(Math.abs(position.travelTo) / 100)
    }

    positions.push(position)
    return position
  }

  const calculateZerosOccurances = (directions, startingPoint) => {
    let totalTimesPointedToZero = 0
    let position = startingPoint
    directions.forEach((dir) => {
      const {newPosition, timesPointedToZero} = calculateNewPosition(position, dir)
      position = newPosition
      totalTimesPointedToZero += timesPointedToZero
    })

    return totalTimesPointedToZero
  }

  calculateZerosOccurances(directions, startingPoint)

  // console.table(positions)

// 5892
