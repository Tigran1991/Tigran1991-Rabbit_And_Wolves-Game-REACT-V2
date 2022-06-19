import { memo, React, useCallback, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Playfield from './Playfield';
import ButtonElements from './ButtonElements';
import { moveCharacters } from './RabbitWolfGameClass';
import { updateBoard } from './redux/features/boardsReducerSlice';
import { selectedInterval } from './redux/features/intervalReducerSlice';

const GameBoard = memo(({ boardData }) => {

    const dispatch = useDispatch();

    const MOVEMENT_INTERVAL = useSelector(selectedInterval);
    console.log(MOVEMENT_INTERVAL);

    const CELL_SIZE = 60;
    const WIDTH_INDEX = 44;
    const HEIGHT_INDEX = 83;

    const ID = boardData.id;
    const SIZE = boardData.size;
    const MATRIX = boardData.matrix;
    const WINNER = boardData.winner;

    const makeUpdateBoard = sideMove => {
        const [updatedMatrix, winnerCharacter] = moveCharacters(sideMove, MATRIX, SIZE);
        dispatch(updateBoard({
            id: ID,
            size: SIZE,
            matrix: updatedMatrix,
            winner: winnerCharacter,
        }))
    }

    const updateBoardData = useCallback(makeUpdateBoard, [ID, SIZE, MATRIX, dispatch]);

    useEffect(() => {
        let interval;
        if(WINNER === undefined){
            interval = setInterval(makeUpdateBoard, MOVEMENT_INTERVAL * 1000);
        }
        return () => clearInterval(interval);       
    });

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
                <ButtonElements updateMatrix={updateBoardData} key={'buttonsDiv' + ID} />
            }
        </div>           
    )
})

export default GameBoard;