import { memo, React, useCallback } from 'react';

import './App.css';

const ButtonElements = memo((props) => {

    return (
        <>
            <div className='buttons-div'>
                <button className='move-right' disabled={props.buttonStatus} onClick={() => props.updateMatrix('move-right')}></button>
                <button className='move-bottom' disabled={props.buttonStatus} onClick={() => props.updateMatrix('move-bottom')}></button>
                <button className='move-left' disabled={props.buttonStatus} onClick={() => props.updateMatrix('move-left')}></button>
                <button className='move-top' disabled={props.buttonStatus} onClick={() => props.updateMatrix('move-top')}></button>
            </div>
        </>
        
    )
})

export default ButtonElements;