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

    positions.push(position)
    return position
  }

  const calculateZerosOccurances = (directions, startingPoint) => {
    let zerosCount = 0
    let position = startingPoint
    directions.forEach((dir) => {
      const {newPosition} = calculateNewPosition(position, dir)
      position = newPosition
      if (newPosition === 0) {
        zerosCount += 1
      }
    })

    return zerosCount
  }

  calculateZerosOccurances(directions, startingPoint)

  // console.table(positions)

  // 1029
