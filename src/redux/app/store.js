import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameFieldReducer, initialGameField } from "../features/gameReducerSlice";
import { moveReducer, initialInterval } from "../features/intervalReducerSlice";
import { sizeReducer, initialSize } from "../features/sizeReducerSlice";
import { boardsReducer } from "../features/boardsReducerSlice";

const store = createStore(
  combineReducers({
    gameField: gameFieldReducer,
    moveingInterval: moveReducer, 
    currentSize: sizeReducer,
    boards: boardsReducer,
  }),
  {
    gameField: initialGameField,
    moveingInterval: initialInterval,
    currentSize: initialSize,
  },composeWithDevTools());

export default store;