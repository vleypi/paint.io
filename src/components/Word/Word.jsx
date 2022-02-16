import React from 'react'
import '../../assets/styles/word.css'
import {useSelector} from 'react-redux'
import {useRequest} from '../../hooks/useRequest'
import { useParams } from 'react-router-dom'
import {socket} from '../../hooks/useSocket'

const Word = ({canvas,drawerCheck}) => {
  const {request} = useRequest()
  const params = useParams()
  const [word,setWord] = React.useState('')

  const wordHandler = (e) =>{
    setWord(e.target.value)
  }

  const sendWord = async () =>{
    try{
      if(word){
        const newWord = await request('/api/game/new-word', 'POST', {word,_id: params.id})
        socket.emit('startRound')
      }
    }
    catch(err){
      return err
    }
  }

  const wordDeskGuesser = {
    wait: 'Рисующий загадывает',
    draw: 'Ожидание ответа',
    win: 'Раунд окончен'
  }

  const wordDeskDrawer = {
    wait: 'Введите слово',
    draw: 'Ожидание ответа',
    win: 'Раунд окончен'
  }

  return (
      <div className='word'>
        {drawerCheck.draw ? 
          <>
              <h3>{wordDeskDrawer[canvas.canvas]}</h3>
              {canvas.canvas === 'wait' &&
                <div>
                  <input value={word} onChange={wordHandler}/>
                  <button onClick={sendWord}>Ввести</button>
                </div>
              }
          </> :
          <>
            <h3>{wordDeskGuesser[canvas.canvas]}</h3>
          </>
        }
      </div>
  )
}

export default Word