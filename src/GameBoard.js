import { memo, React, useCallback, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { INITIAL_PARAMETERS } from './RabbitWolfGameClass';
import Playfield from './Playfield';
import ButtonElements from './ButtonElements';
import { moveCharacters } from './RabbitWolfGameClass';
import { updateBoard } from './redux/features/boardsReducerSlice';
import { selectedInterval } from './redux/features/intervalReducerSlice';

const GameBoard = memo(({ boardData }) => {

    const dispatch = useDispatch();

    const MOVEMENT_INTERVAL = useSelector(selectedInterval);

    const ID = boardData.id;
    const SIZE = boardData.size;
    const MATRIX = boardData.matrix;
    const WINNER = boardData.winner;
    const BUTTON_STATUS = boardData.button;

    const makeUpdateBoard = sideMove => {
        const [updatedMatrix, winnerCharacter] = moveCharacters(sideMove, MATRIX, SIZE);
        let buttonStatus;
        !sideMove ? buttonStatus = false : buttonStatus = true;
        dispatch(updateBoard({
            id: ID,
            size: SIZE,
            matrix: updatedMatrix,
            winner: winnerCharacter,
            button: buttonStatus,
        }))
    }

    const updateBoardData = useCallback(makeUpdateBoard, [ID, SIZE, MATRIX, dispatch]);

    useEffect((interval) => {
        if(WINNER === undefined){
            interval = setInterval(makeUpdateBoard, MOVEMENT_INTERVAL * 1000);
        }
        return () => clearInterval(interval);       
    });

    const boardStyle = {
        width: INITIAL_PARAMETERS.cellSize * SIZE + INITIAL_PARAMETERS.widthIndex,
        height: INITIAL_PARAMETERS.cellSize * SIZE + INITIAL_PARAMETERS.heightIndex,
    }

    return (
        <div className="boardContainer">

            <div className="board" style={boardStyle}>
                {
                    WINNER !== undefined ?
                    <h1 className='winner'> {WINNER} WIN ! </h1> :
                    <Playfield matrix={MATRIX} />
                }
            </div>

            {
                WINNER === undefined &&
                <ButtonElements updateMatrix={updateBoardData} buttonStatus={BUTTON_STATUS} />
            }
        </div>           
    )
})

export default GameBoard;