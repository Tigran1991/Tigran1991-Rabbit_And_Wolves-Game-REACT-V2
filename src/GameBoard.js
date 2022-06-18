import { memo, React, useCallback }  from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import Playfield from './Playfield';
import ButtonElements from './ButtonElements';
import { makeGameBoard } from './RabbitWolfGameClass';
import { updateBoard } from './redux/features/boardsReducerSlice';

const GameBoard = memo(({ boardData }) => {

    const dispatch = useDispatch();

    const CELL_SIZE = 60;
    const WIDTH_INDEX = 44;
    const HEIGHT_INDEX = 83;

    const ID = boardData.id;
    const SIZE = boardData.size;
    const MATRIX = boardData.matrix;
    const WINNER = boardData.winner;

    const UPDATE_BOARD = useCallback(sideMove => {
        const [updatedMatrix, winnerCharacter] = makeGameBoard(sideMove, MATRIX, SIZE);
        dispatch(updateBoard({
            id: ID,
            size: SIZE,
            matrix: updatedMatrix,
            winner: winnerCharacter, 
        }))
    }, [ID, SIZE, MATRIX, dispatch]);

    const boardStyle = {
        width: CELL_SIZE * SIZE + WIDTH_INDEX,
        height: CELL_SIZE * SIZE + HEIGHT_INDEX,
    }

    return (
        <div className="boardContainer">

            <div className="board" style={boardStyle}>
                {
                    WINNER !== undefined ?
                    <h1 className='winner'> {WINNER} WIN ! </h1> :
                    <Playfield matrix={MATRIX} key={'playfield' + ID} />
                }
            </div>

            {
                WINNER === undefined &&
                <ButtonElements updateMatrix={UPDATE_BOARD} key={'buttonsDiv' + ID} />
            }
        </div>           
    )
})

export default GameBoard;