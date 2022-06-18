import { React, memo } from "react";
import { useDispatch } from "react-redux";
import { selectSize } from "./redux/features/sizeReducerSlice";

import './App.css';

const Options = memo(({ createNewGame }) => {

    const dispatch = useDispatch();

    return (
        <>
            <div className="gameOptions">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    createNewGame()
                    }}>
                    <select onChange={(event) => {
                        dispatch(selectSize(parseInt(event.target.value)))
                    }}>
                        <option value='7'>7 X 7</option>
                        <option value='8'>8 X 8</option>
                        <option value='9'>9 X 9</option>
                    </select>                
                    <input type="submit" value="NEW BOARD" />
                </form>
                <button className="reloadBtn" onClick={() => window.location.reload()}>Reload</button>             
            </div>
        </>        
    )
})

export default Options;