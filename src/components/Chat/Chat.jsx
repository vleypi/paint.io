import React from 'react'
import { useDispatch } from 'react-redux'
import chat from '../../assets/images/chat.svg'
import '../../assets/styles/chat.css'
import { useRequest } from '../../hooks/useRequest'
import { socket } from '../../hooks/useSocket'

const Chat = ({drawerCheck, profile, canvas}) => {
  const [mes,setMes] = React.useState([])
  const [input,setInput] = React.useState('')

  React.useEffect(()=>{
    socket.on('newMes', (msg)=>{
      setMes(prev => [msg, ...prev])
    })
  },[])

  const newMesHandler = async () =>{
    if(input){
      socket.emit('newMes', {name: profile.name, id: profile.id, mes: input})
    }
  }

  const inputHandler = (e) =>{
    setInput(e.target.value)
  }

  return (
    <div className='chat'>
        <h2>Чат</h2>
        <div className='chatArea' style={{height: drawerCheck.draw ? '80%' : '72%' }}> 
          {mes.map(it=>(
            <div>
              <h4>{it.name}</h4>
              <p>{it.mes}</p>
            </div>
          ))}
        </div>
        {!drawerCheck.draw && canvas.canvas === 'draw' &&
          <div className='inputChat'>
            <input value={input} onChange={inputHandler}/>
            <button onClick={newMesHandler}>Отправить</button>
          </div>
        }
    </div>
  )
}

export default Chat