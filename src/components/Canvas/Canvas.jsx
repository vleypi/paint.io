import React from 'react'
import CanvasDraw from "react-canvas-draw";
import '../../assets/styles/canvas.css'
import '../../assets/styles/panel.css'
import Chat from '../Chat/Chat';
import Leaders from '../Leaders/Leaders';
import Word from '../Word/Word';
import { socket } from '../../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import CanvasPopup from './CanvasPopup';
import { setCanvas, setNewDrawer } from '../../store/canvas';

const Canvas = () => {
    const dispatch = useDispatch()
    const canvasRef = React.useRef()
    const [stopChange,setStopChange] = React.useState(false)

    const canvas = useSelector(({canvas})=>canvas)

    const profile = useSelector(({profile})=>profile)
    const drawerCheck = canvas.users.length > 0 && canvas.users.find(it=>it.id === profile.id) 

    const sendDraw = (e) =>{
        if(!stopChange){
            socket.emit('newDrawServer', canvasRef.current.getSaveData())
        }
    }

    React.useEffect(()=>{
        socket.on('startRound', (msg)=>{
            dispatch(setCanvas('draw', msg))
        })
        socket.on('win', (msg)=>{
            dispatch(setCanvas('win', msg))
        })
        socket.on('newDrawer', msg=>{
            dispatch(setCanvas('wait', msg))
            dispatch(setNewDrawer(msg))
        })
        socket.on('newDrawClient', (msg)=>{
            setStopChange(true)
            canvasRef.current.loadSaveData(msg, true)
        })
    },[])

    

    return (
        <div className='canvas'>
            <div className='canvasActions'>
                <CanvasPopup />
                <CanvasDraw
                    disabled={canvas.canvas !== 'draw' || !drawerCheck.draw}
                    ref={canvasRef}
                    onChange={sendDraw}
                    canvasWidth={1000}
                    canvasHeight={900}
                    brushRadius={2}
                    // gridColor={}
                    lazyRadius={5}
                />
            </div>
            <div className='panel'>
                <Leaders canvas={canvas} drawerCheck={drawerCheck} profile={profile}/>
                <Chat canvas={canvas} drawerCheck={drawerCheck} profile={profile}/>
                <Word canvas={canvas} drawerCheck={drawerCheck} profile={profile}/>
            </div>
        </div>
    )
}

export default Canvas