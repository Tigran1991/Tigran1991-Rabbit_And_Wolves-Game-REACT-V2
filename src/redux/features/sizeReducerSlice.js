export function sizeReducer(state={}, action) {
  if(action.type === 'select-size') {
    return {
      ...state,
      size: action.payload.size
    }
  }

  return state;
};

export const initialSize = {
  size: 7,
};

export function selectedSize(state) {
  return state.currentSize.size;
};

export function selectSize(newSize) {
  return {
    type: 'select-size',
    payload: {
      size: newSize,
    }
  }
};