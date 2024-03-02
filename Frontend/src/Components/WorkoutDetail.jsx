import React from 'react'

function WorkoutDetail({workout}) {
  return (
    <div className='workout-details'>
        <h2>{workout.title}</h2>
        <p><strong>Load (kg):</strong> {workout.reps}</p>
        <p><strong>Reps :</strong> {workout.reps}</p>
        <p className='date'>{workout.createdAt.split('T')[0]}</p>
    </div>
  )
}

export default WorkoutDetail