 import React, { useState } from 'react'
import { useWorkoutContext } from '../Context/WorkoutContext'
import {Toaster , toast} from "react-hot-toast"

function WorkoutForm() {
    const [title , setTitle] = useState('')
    const [reps , setReps] = useState("")
    const [loads , setLoads] = useState("") 
    const [emptyFields , setEmptyFields] = useState([])
    
    const {dispatch} = useWorkoutContext()
   

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const workout = {title , reps , loads}

        const response = await fetch(`${import.meta.env.VITE_DBURL}/api/workouts` , {
            method : "POST",
            body : JSON.stringify(workout),
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem('auth_token'))}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle("")
            setReps("")
            setLoads("")
            setEmptyFields([])
            toast.success("new workout added")
            console.log("new workout added" , json)
            dispatch({type:"CREATE_WORKOUT", payload: json})

        }

    }
  return (
    <>
    <Toaster  position="top-center"/>

    <form className="workout-form" onSubmit={handleSubmit}>
        <h2>Create workout</h2> 
        <label>
            <b>Workout Title:</b>
        </label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)}
            className={emptyFields.includes("title") ? "error" : ""}
            
            />
        
        <label>
          <b>  Load (in kg):</b>
        </label>
        <input  
            type='number'  
            value={loads}
            onChange={e => setLoads(e.target.valueAsNumber)}
            className={emptyFields.includes("loads") ? "error" : ""}

        />
        <label>
            <b>Reps:</b>
        </label>
        <input 
            type='number'  
            value={reps}  
            onChange={e => setReps(e.target.valueAsNumber)}
            className={emptyFields.includes("reps") ? "error" : ""}

        /><br/>
        <button>Submit</button>
        
    </form>
    </>

  )
}

export default WorkoutForm