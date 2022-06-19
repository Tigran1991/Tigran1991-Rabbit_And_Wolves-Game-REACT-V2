export function moveReducer(state={}, action) {
    if(action.type === 'select-interval') {
      return {
        ...state,
        interval: action.payload.interval
      }
    }
  
    return state;
  };
  
  export const initialInterval = {
    interval: 1,
  };
  
  export function selectedInterval(state) {
    return state.moveingInterval.interval;
  };
  
  export function selectInterval(newInterval) {
    return {
      type: 'select-interval',
      payload: {
        interval: newInterval,
      }
    }
  };