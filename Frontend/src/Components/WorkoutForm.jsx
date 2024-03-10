import React, { useState } from 'react'
import { useWorkoutContext } from '../Hooks/useWorkoutContext'
import {Toaster , toast} from "react-hot-toast"

function WorkoutForm() {
    const [title , setTitle] = useState('')
    const [reps , setReps] = useState("")
    const [loads , setLoads] = useState("")
    const [error , setError] = useState('')
    const [emptyFields , setEmptyFields] = useState([])
    
    const {dispatch} = useWorkoutContext()
    
    //  if(error){

    //      toast.error(error)
    //  } 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const workout = {title , reps , loads}

        const response = await fetch('http://localhost:8089/api/workouts' , {
            method : "POST",
            body : JSON.stringify(workout),
            headers:{
                "Content-Type":"application/json"
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
            setError(null)
            setEmptyFields([])
            console.log("new workout added" , json)
            dispatch({type:"CREATE_WORKOUT", payload: json})

        }

    }
  return (
    <>
    <Toaster  position="top-center"/>

    <form className="workout-form" onSubmit={handleSubmit}>
        <h2>Add a workout</h2> 
        <label>
            <b>Workout Title:</b>
        </label>
            <input type='text' value={title} onChange={e => {setTitle(e.target.value); setError()}}
            className={emptyFields.includes("title") ? "error" : ""}
            
            />
        
        <label>
          <b>  Load (in kg):</b>
        </label>
        <input  
            type='number'  
            value={loads}
            onChange={e => {setLoads(e.target.valueAsNumber); setError(null)}}
            className={emptyFields.includes("loads") ? "error" : ""}

        />
        <label>
            <b>Reps:</b>
        </label>
        <input 
            type='number'  
            value={reps}  
            onChange={e => {setReps(e.target.valueAsNumber); setError(null)}}
            className={emptyFields.includes("reps") ? "error" : ""}

        /><br/>
        <button>Submit</button>
        
    </form>
    </>

  )
}

export default WorkoutForm