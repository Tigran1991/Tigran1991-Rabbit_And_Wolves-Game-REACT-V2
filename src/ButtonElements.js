import { memo, React } from 'react';

import './App.css';

const ButtonElements = memo(({ updateMatrix }) => {

    return (
        <>
            <div className='buttons-div'>
                <button className='move-right' onClick={() => updateMatrix('move-right')}></button>
                <button className='move-bottom' onClick={() => updateMatrix('move-bottom')}></button>
                <button className='move-left' onClick={() => updateMatrix('move-left')}></button>
                <button className='move-top' onClick={() => updateMatrix('move-top')}></button>
            </div>
        </>
        
    )
})

export default ButtonElements;