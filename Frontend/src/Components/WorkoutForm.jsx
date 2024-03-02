import React, { useState } from 'react'

function WorkoutForm() {
    const [title , setTitle] = useState('')
    const [reps , setReps] = useState(0)
    const [loads , setLoads] = useState(0)
    const [error , setError] = useState('')
  return (
    <form className="workout-form">
        <h2>Add a workout</h2> 
        <label>
            Title:
        </label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)}
            /><br/>
        
        <label>
            Reps:
        </label>
        <input 
            type='number'  
            value={reps}  
            onChange={e => setReps(e.target.valueAsNumber)}
        /><br/>
        <label>
            Sets:
        </label>
        <p>How many times did you do those reps?</p>
        <input  
            type='number'  
            value={loads}
            onChange={e => setLoads(e.target.valueAsNumber)}
        /><br/>
        <button disabled={!validateInput()} onClick={handleSubmit}>Submit</button><br   />
        { error && <p>{error}</p>}
    </form>
  )
}

export default WorkoutForm