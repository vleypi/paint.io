import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/styles/nickname.css'
import { useAuth } from '../../hooks/useAuth'
import {useRequest} from '../../hooks/useRequest'
import { socket } from '../../hooks/useSocket'
import {useNavigate} from 'react-router-dom'
import { setUsers } from '../../store/canvas'

const Nickname = () => {
    const {loginAuth} = useAuth()
    const {request} = useRequest()
    const dispatch = useDispatch()
    

    const route = useNavigate()

    const [input,setInput] = React.useState('')

    const profile = useSelector(({profile})=>profile)

    const inputhandler = (e) =>{
        setInput(e.target.value)
    }

    const enterNickname = () =>{
        if(input){
            loginAuth(input)
        }
    }

    const createLobby = async () =>{
        try{
            const create = await request('/api/game/create', 'POST',profile)
            socket.emit('createLobby',{_id: create.game._id, id: profile.id,profile: profile.name})
            dispatch(setUsers(create.game.users))
            route('/'+create.game._id)
        }
        catch(err){
            return err
        }
    }

    React.useEffect(()=>{
        setInput(profile.name)
    },[profile.name])

    return (
        <div className='nickname'>
            <div className='nicknameContent'>
                <h2>Введите имя</h2>
                <div>
                    <input onChange={inputhandler} value={input} />
                    <button onClick={enterNickname}>Ввести</button>
                </div>
                <button disabled={!profile.name && !profile.id} onClick={createLobby} className='create'>
                    Создать
                </button>
            </div>
        </div>
  )
}

export default Nickname