import React, { useState } from 'react'

function WorkoutForm() {
    const [title , setTitle] = useState('')
    const [reps , setReps] = useState(0)
    const [loads , setLoads] = useState(0)
    const [error , setError] = useState('')

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
            setError(json.error)
        }
        if(response.ok){
            setTitle("")
            setReps(0)
            setLoads(0)
            setError("")
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