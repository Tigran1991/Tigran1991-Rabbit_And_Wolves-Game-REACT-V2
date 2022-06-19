export function buttonStatusReducer(state={}, action) {
    if(action.type === 'select-buttonStatus') {
      return {
        ...state,
        status: action.payload.status
      }
    }
  
    return state;
  };
  
  export const initialStatus = {
    status: true,
  };
  
  export function selectedStatus(state) {
    return state.buttonWorkStatus.status;
  };
  
  export function selectStatus(newStatus) {
    return {
      type: 'select-buttonStatus',
      payload: {
        status: newStatus,
      }
    }
  };