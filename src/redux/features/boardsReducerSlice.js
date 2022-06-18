import { boardReducer } from "./boardReducerSlice";

export const boardsReducer = (state = [], action) => {
  if (action.type === "add-board") {
    return [...state, boardReducer(undefined, action)];
  }
  if (action.type === "make-movement") {
    return state.map(board => { 
      if (board.id === action.payload.id) {
        board.matrix = action.payload.matrix;
        board.winner = action.payload.winner;
        return {...board, matrix: action.payload.matrix, winner: action.payload.winner};
      }
      return board;
    });
  }
  
  return state;
}

export const selectedBoards = (state) => {
  return state.boards;
}

export const updateBoard = (updatedValues) => {
  return {
    type: "make-movement",
    payload: {
      id: updatedValues.id,
      size: updatedValues.size,
      matrix: updatedValues.matrix,
      winner: updatedValues.winner,
    },
  };
}