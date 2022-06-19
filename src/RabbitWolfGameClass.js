export const generateId = () => Math.floor(Math.random() * 100000);

const add = (summableA, sumableB) => summableA + sumableB;

const determineAdjacentPosition = (position, direction) => {
  const STEP_ON_X = add(position[X], direction[X]);
  const STEP_ON_Y = add(position[Y], direction[Y]);
  return Array.of(STEP_ON_X, STEP_ON_Y);
};

const calculateDistance = (a, b) => {
  const [POSITION_X, POSITION_Y] = a;
  return Math.sqrt((b[X] - POSITION_X) ** 2 + (b[Y] - POSITION_Y) ** 2);
};

export const FREE_CELL = 0;
const RABBIT = 1;
const WOLF = 2;
const HOUSE = 3;
const FENCE = 4;

const X = 0,
  Y = 1;

const MOVE_DIRECTION = {
  "move-right": [0, 1],
  "move-bottom": [1, 0],
  "move-left": [0, -1],
  "move-top": [-1, 0],
};

const DIRECTION_MOVEMENT = Object.values(MOVE_DIRECTION);

export const CHARACTERS = {
  [FREE_CELL]: {
    id: "cell",
  },
  [RABBIT]: {
    name: "RABBIT",
    characterCount: 1,
    canMove: [FREE_CELL, WOLF, HOUSE],
    id: "rabbit",
  },
  [WOLF]: {
    name: "WOLF",
    canMove: [FREE_CELL, RABBIT],
    id: "wolf",
  },
  [HOUSE]: {
    characterCount: 1,
    id: "house",
  },
  [FENCE]: {
    id: "fence",
  },
};

const CHARACTERS_KEYS = Object.keys(CHARACTERS);

export const createCurrentMatrix = (boardSize) => {
  const createInitialMatrix = (boardSize) => {
    const MATRIX = new Array(boardSize)
      .fill(0)
      .map(() => new Array(boardSize).fill(0));
    return MATRIX;
  };

  const getRandomPositionsForCharacter = (initialMatrix, initialSize) => {
    const x = Math.floor(Math.random() * initialSize);
    const y = Math.floor(Math.random() * initialSize);
    if (initialMatrix[x][y] === 0) {
      return [x, y];
    } else {
      return getRandomPositionsForCharacter(initialMatrix, initialSize);
    }
  };

  const setCharacterOnPlayfield = (matrix, size) => {
    CHARACTERS[WOLF].characterCount = (size * 40) / 100;
    CHARACTERS[FENCE].characterCount = (size * 40) / 100;
    CHARACTERS_KEYS.forEach((character) => {
      for (let i = 0; i < CHARACTERS[character].characterCount; i++) {
        const [m, n] = getRandomPositionsForCharacter(matrix, size);
        matrix[m][n] = Number(character);
      }
    });
    return matrix;
  };

  const INITIAL_MATRIX = createInitialMatrix(boardSize);

  return setCharacterOnPlayfield(INITIAL_MATRIX, boardSize);

};

export const moveCharacters = (moveDirection, matrix, size) => {
  
  const determineNearestPosition = ({ DISTANCES, POSITIONS }) =>
    POSITIONS[DISTANCES.indexOf(Math.min(...DISTANCES))];

  const getCharactersCurrentPosition = (character) => {
    const CHARACTER_POSITION = new Array(0);
    matrix.forEach((elem, elemIndex) => {
      if (elem.includes(character)) {
        elem.forEach((item, index) => {
          if (item === character) {
            CHARACTER_POSITION.push(Array.of(elemIndex, index));
          }
        });
      }
    });
    return CHARACTER_POSITION;
  };

  const moveCharacter = (character, positions) => {
    const [CURRENT_X, CURRENT_Y] = positions.currentPosition;
    const [NEW_POSITION_X, NEW_POSITION_Y] = positions.newPosition;
    matrix[CURRENT_X].splice(CURRENT_Y, 1, FREE_CELL);
    matrix[NEW_POSITION_X].splice(NEW_POSITION_Y, 1, character);
  };

  const determineNextPositionCharacter = (position) => {
    return matrix[position[X]][position[Y]];
  };

  const isRabbitCanMove = (position) => {
    const NEXT_POSITION_CHARACTER = determineNextPositionCharacter(position);
    if (CHARACTERS[RABBIT].canMove.includes(NEXT_POSITION_CHARACTER)) {
      return true;
    }
  };

  const getNewPosition = (step, size) => {
    const NEW_X = add(size, step[X]) % size;
    const NEW_Y = add(size, step[Y]) % size;
    return Array.of(NEW_X, NEW_Y);
  };

  const calculateRabbitNewPosition = (position, direction) => {
    const STEP = determineAdjacentPosition(position, MOVE_DIRECTION[direction]);
    return getNewPosition(STEP, size);
  };

  const getRabbitPositions = (moveSide) => {
    const DIRECTION = moveSide;
    let currentPosition = getCharactersCurrentPosition(RABBIT)[X];
    let newPosition = calculateRabbitNewPosition(currentPosition, DIRECTION);
    if (isRabbitCanMove(newPosition) && isInRange(newPosition)) {
      return {
        currentPosition,
        newPosition,
      };
    }
  };

  const updateRabbitPosition = (position) => {
    if (position) {
      moveCharacter(RABBIT, position);
    }
  };

  const getRabbitNewPosition = (moveSide) => {
    const RABBIT_POSITIONS = getRabbitPositions(moveSide);
    if (RABBIT_POSITIONS) {
      updateRabbitPosition(RABBIT_POSITIONS);
      return RABBIT_POSITIONS.newPosition;
    }
  };

  const getPlayfieldRange = (size) => {
    return [...Array(size).keys()];
  };

  const isInRange = (position) => {
    const RANGE = getPlayfieldRange(size);
    if (RANGE.includes(position[X]) && RANGE.includes(position[Y])) {
      return true;
    }
  };

  const isWolfCanMove = (position) => {
    const NEXT_POSITION_CHARACTER = determineNextPositionCharacter(position);
    if (CHARACTERS[WOLF].canMove.includes(NEXT_POSITION_CHARACTER)) {
      return true;
    }
  };

  const getDistancesAndPositions = (wolfPosition, rabbitPosition) => {
    const DISTANCES = new Array(0);
    const POSITIONS = new Array(0);
    DIRECTION_MOVEMENT.forEach((direction) => {
      const POSITION = determineAdjacentPosition(wolfPosition, direction);
      if (isInRange(POSITION) && isWolfCanMove(POSITION) && rabbitPosition) {
        const DISTANCE = calculateDistance(rabbitPosition, POSITION);
        DISTANCES.push(DISTANCE);
        POSITIONS.push(POSITION);
      }
    });
    return {
      DISTANCES,
      POSITIONS,
    };
  };

  const getPositions = (wolfPosition, rabbitPosition) => {
    let currentPosition = wolfPosition;
    const DISTANCES_AND_POSITIONS = getDistancesAndPositions(
      wolfPosition,
      rabbitPosition
    );
    let newPosition = determineNearestPosition(DISTANCES_AND_POSITIONS);
    return {
      currentPosition,
      newPosition,
    };
  };

  const updateWolfPosition = (rabbitPosition) => (position) => {
    const WOLF_POSITIONS = getPositions(position, rabbitPosition);
    if (!WOLF_POSITIONS.newPosition) {
      WOLF_POSITIONS.newPosition = WOLF_POSITIONS.currentPosition;
    } else if (rabbitPosition && getCharactersCurrentPosition(HOUSE)[X]) {
      moveCharacter(WOLF, WOLF_POSITIONS);
    }
  };

  const updateWolvesPositions = (charactersPositions) => {
    charactersPositions.wolvesCurrentPositions.map(
      updateWolfPosition(charactersPositions.rabbitNewPosition)
    );
  };

  const getCharactersPositions = (direction) => {
    let rabbitNewPosition;
    let wolvesCurrentPositions;
    if(direction !== undefined){
      rabbitNewPosition = getRabbitNewPosition(direction);
      wolvesCurrentPositions = null;
    }else{
      rabbitNewPosition = getCharactersCurrentPosition(RABBIT)[X];
      wolvesCurrentPositions = getCharactersCurrentPosition(WOLF);
    }

    return {
      wolvesCurrentPositions,
      rabbitNewPosition,
    };
  };

  

  const determineWinnerCharacter = () => {
    const WOLF_COUNT = (size * 40) / 100;
    if (!getCharactersCurrentPosition(RABBIT)[X] ||
      getCharactersCurrentPosition(WOLF).length < WOLF_COUNT) {
      return CHARACTERS[WOLF].name;
    } else if (!getCharactersCurrentPosition(HOUSE)[X]) {
      return CHARACTERS[RABBIT].name;
    }
  };

  const displayWinnerCharacter = () => {
    return determineWinnerCharacter();
  };

  const decideGameCourse = () => {
    if (determineWinnerCharacter()) {
      return displayWinnerCharacter();
    }
  };

  const POSITIONS = getCharactersPositions(moveDirection);

  const gameResult = (winnerCharacter) => {

    if(POSITIONS.wolvesCurrentPositions === null){
      winnerCharacter = decideGameCourse();
      return [matrix, winnerCharacter];
    }else{
      updateWolvesPositions(POSITIONS);
      winnerCharacter = decideGameCourse();
      return [matrix, winnerCharacter];
    }
  }

  return gameResult();
};
