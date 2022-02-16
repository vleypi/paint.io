const initialState = {
    canvas: 'wait',
    users: [],
}

//canvas wait play win

const canvas = (state=initialState, action) =>{
    if(action.type === 'SET_CANVAS'){
        return{
            ...state,
            canvas: action.canvas,
            winner: action.winner
        }
    }
    else if(action.type === 'SET_USERS'){
        return{
            ...state,
            users: action.users
        }
    }
    else if(action.type === 'SET_USERS_CONNECT'){
        return{
            ...state,
            users: [...state.users, {name: action.user.name, id: action.user.id}]
        }
    }
    else if(action.type === 'SET_USERS_DISCONNECT'){
        return{
            ...state,
            users: state.users.filter(it=>it.id !== action.user.id)
        }
    }
    else if(action.type === 'SET_NEW_DRAWER'){
        const indexDrawer = state.users.findIndex((it)=>{return it.draw === true})
        const indexNewDrawer = state.users.findIndex((it)=>{return it.id === action.drawer.id})
        const users = [...state.users]
        users[indexDrawer].draw = false
        users[indexNewDrawer].draw = true
        return{
            ...state,
            users
        }
    }
    return state
}

export const setCanvas = (canvas,winner) =>({
    type: 'SET_CANVAS',
    canvas,
    winner
})

export const setUsers = (users) =>({
    type: 'SET_USERS',
    users,

})

export const setUsersConnect = (user) =>({
    type: 'SET_USERS_CONNECT',
    user
})

export const setUsersDisconnect = (user) =>({
    type: 'SET_USERS_DISCONNECT',
    user
})

export const setNewDrawer = (drawer) =>({
    type: 'SET_NEW_DRAWER',
    drawer
})

export default canvas