import React from 'react'
import { useSelector } from 'react-redux'

const CanvasPopup = () => {
    const canvas = useSelector(({canvas})=>canvas)
    return (
        <>
        {canvas.canvas === 'wait' && 
            <div className='canvasPopup'>
                <div>
                    <h2>Ждем рисующего</h2>
                </div>
            </div>
        }
        {canvas.canvas === 'win' && 
            <div className='canvasPopup win'>
                <div>
                    <h2>{canvas.winner.name} Побеждает</h2>
                    <h3>{canvas.winner.mes}</h3>
                </div>
            </div>
        }
        </>
    )
}

export default CanvasPopup