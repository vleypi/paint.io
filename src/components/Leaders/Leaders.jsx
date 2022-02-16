import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../../assets/styles/leaders.css'
import { useRequest } from '../../hooks/useRequest'
import { socket } from '../../hooks/useSocket'
import { setUsers, setUsersConnect, setUsersDisconnect } from '../../store/canvas'


const Leaders = () => {
    const dispatch = useDispatch()
    const users = useSelector(({canvas})=>canvas.users)
    const profile = useSelector(({profile})=>profile)
    const params = useParams()

    const {request} = useRequest()

    const route =  useNavigate()

    const mapUsers = users.map((it)=>
        <div>
            <p>{it.name}</p>
            <p>120</p>
        </div>
    )

    React.useEffect(()=>{
        socket.on('userConnect',(msg)=>{
            dispatch(setUsersConnect(msg))
        })
        socket.on('userDisconnect',(msg)=>{
            dispatch(setUsersDisconnect(msg))
        })
    },[])

    React.useEffect(()=>{
        if(profile.name && profile.id){
            const getGame = async () =>{
                try{
                    const game = await request('/api/game/get', 'POST', {name: profile.name, id: profile.id,_id: params.id})
                    if(game.game.users[0].id !== profile.id){
                        socket.emit('createLobby',{_id: game.game._id, id: profile.id, name: profile.name})
                        dispatch(setUsers(game.game.users))
                    }
                }
                catch(err){
                    return route('/',{replace: true})
                }
            }
            getGame()
        }
    },[profile])

    return (
        <div className='leaders'>
            {mapUsers}
        </div>
  )
}

export default Leaders