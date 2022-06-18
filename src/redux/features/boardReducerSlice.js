export const boardReducer = (state={}, action) => {
  if (action.type === "add-board") {
    return {
      ...state,
      id: action.payload.id,
      size: action.payload.size,
      matrix: action.payload.matrix,
    };
  }

  return state;
}

export const selectedBoard = (newBoard) => {
  return {
    type: "add-board",
    payload: {
      id: newBoard.id,
      size: newBoard.size,
      matrix: newBoard.matrix,
    },
  };
}