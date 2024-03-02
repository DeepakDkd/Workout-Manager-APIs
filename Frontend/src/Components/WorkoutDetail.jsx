import React from 'react'

function WorkoutDetail({workout}) {
  return (
    <div className='workout-details'>
        <h2>{workout.title}</h2>
        <p><strong>Reps :</strong> {workout.reps}</p>
        <p><strong>Loads :</strong> {workout.reps}</p>
        <p>{workout.createdAt.split('T')[0]}</p>
    </div>
  )
}

export default WorkoutDetail