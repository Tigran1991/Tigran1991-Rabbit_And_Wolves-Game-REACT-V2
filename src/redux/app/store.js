import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameFieldReducer, initialGameField } from "../features/gameReducerSlice";
import { sizeReducer, initialSize } from "../features/sizeReducerSlice";
import { boardsReducer } from "../features/boardsReducerSlice";

const store = createStore(
  combineReducers({
    gameField: gameFieldReducer,
    currentSize: sizeReducer,
    boards: boardsReducer,
  }),
  {
    gameField: initialGameField,
    currentSize: initialSize,
  },composeWithDevTools());

export default store;