const initialState = {
    name: '',
    id: null
}

const profile = (state=initialState, action) =>{
    if(action.type === 'SET_PROFILE'){
        return{
            ...state,
            name: action.name,
            id: action.id,
        }
    }
    return state
}

export const setProfile = (name,id) =>({
    type: 'SET_PROFILE',
    name,
    id
})

export default profile