import {useCallback,useEffect,useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {setProfile} from '../store/profile'
import shortid from 'shortid'


export const useAuth = () =>{
    
    const dispatch = useDispatch()
    
    const loginAuth = useCallback((name)=>{
        const id = shortid.generate().toLowerCase()
        dispatch(setProfile(name,id))
        localStorage.setItem('data',JSON.stringify({
            name,
            id
        }))
        
    },[])

    const logoutAuth = useCallback(()=>{
        dispatch(setProfile(null,null))
        localStorage.removeItem('data')
    },[])

    useEffect(()=>{
        let data = eval('[' + localStorage.getItem('data') + ']')[0]
        if(data && data.name && data.id){
            loginAuth(data.name,data.id)
        }
        else{
            logoutAuth()
        }
    },[])
    return {loginAuth}
}
