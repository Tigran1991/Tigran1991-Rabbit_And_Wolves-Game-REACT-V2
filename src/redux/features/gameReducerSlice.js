export function gameFieldReducer(state={}, action){
    if(action.type === "make-gameField") {
        return {
            makeGameField: action.payload.makeGameField,
        }
    }

    return state;
}

export const initialGameField = {
    makeGameField: false
}

export function makeGameField(make){
    return make.gameField
}

export function gameFieldStatus(status){
    return {
        type: "make-gameField",
        payload: {
            makeGameField: status,
        }
    }
}

