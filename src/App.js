import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import './App.css';
import Options from "./Options";
import GameBoard from "./GameBoard";
import { makeGameBoard, generateId } from './RabbitWolfGameClass';
import { gameFieldStatus, makeGameField } from "./redux/features/gameReducerSlice";
import { selectedSize } from "./redux/features/sizeReducerSlice";
import { selectedBoard } from './redux/features/boardReducerSlice';
import { selectedBoards } from './redux/features/boardsReducerSlice';

const App = () => {

  const dispatch = useDispatch();

  const MAKE_GAME = useSelector(makeGameField);
  const CURRENT_SIZE = useSelector(selectedSize);
  const BOARDS = useSelector(selectedBoards);

  const makeNewBoard = useCallback(() => {
    dispatch(selectedBoard({
      id: generateId(),
      size: CURRENT_SIZE,
      matrix: createCurrentMatrix(CURRENT_SIZE),
    }))
  }, [CURRENT_SIZE, dispatch]);

  return (
    <div className="App">
        {
          !MAKE_GAME.makeGameField
          && <button className="newGameBtn" onClick={() => dispatch(gameFieldStatus(true))}>New Game</button>
        }

        <div className="container">

          {MAKE_GAME.makeGameField &&
            <Options createNewGame={makeNewBoard} />
          }

          <div className="boardField">
            {BOARDS.map(board => {
              return <GameBoard boardData={board} key={board.id} />
            })} 
          </div>
        </div>
    </div>
  )
}

export default App;