import React, { useState } from 'react'
import { useWorkoutContext } from '../Hooks/useWorkoutContext'

function WorkoutForm() {
    const [title , setTitle] = useState('')
    const [reps , setReps] = useState("")
    const [loads , setLoads] = useState("")
    const [error , setError] = useState('')
    
    const {dispatch} = useWorkoutContext()
    
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
        console.log(json)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle("")
            setReps("")
            setLoads("")
            setError(null)
            console.log("new workout added" , json)
            dispatch({type:"CREATE_WORKOUT", payload: json})

        }

    }
  return (
    <form className="workout-form" onSubmit={handleSubmit}>
        <h2>Add a workout</h2> 
        <label>
            <b>Workout Title:</b>
        </label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)}
            />
        
        <label>
          <b>  Load (in):</b>
        </label>
        <input  
            type='number'  
            value={loads}
            onChange={e => setLoads(e.target.valueAsNumber)}
        />
        <label>
            <b>Reps:</b>
        </label>
        <input 
            type='number'  
            value={reps}  
            onChange={e => setReps(e.target.valueAsNumber)}
        /><br/>
        <button>Submit</button>
        { error && <p className='error'>{error}</p>}
    </form>
  )
}

export default WorkoutForm