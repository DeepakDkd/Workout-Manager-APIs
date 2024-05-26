import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
function RouteProtector({children , authentication=false}) {
    const {user} = useAuth()
    console.log(user)
    const navigate = useNavigate()
    const [loader,setloader] = useState(true)
  

    useEffect(() => {
        if(user && !authentication){
            navigate('/')
        }
        if(!user && authentication){
            navigate('/login')
        }

        return () => {
            setloader(false)
        }
    },[user,navigate])

  return <>
  {loader ? <div className='loader'></div> : children}

  </>
}

export default RouteProtector