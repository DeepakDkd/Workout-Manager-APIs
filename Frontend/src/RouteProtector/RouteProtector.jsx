import React, { useEffect} from 'react'
import { useAuth } from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
function RouteProtector({children , authentication=false}) {
    const {user} = useAuth()
    const navigate = useNavigate()
  

    useEffect(() => {
        if(user && !authentication){
            navigate('/')
        }
        if(!user && authentication){
            navigate('/login')
        }

      
    },[user,navigate])

  return <>
  {children}

  </>
}

export default RouteProtector