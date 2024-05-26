import React from "react";
import { useWorkoutContext } from  "../Context/WorkoutContext";
import { Toaster, toast } from "react-hot-toast";
// date fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

function WorkoutDetail({ workout }) {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch(
      'https://workout-manager-apis.onrender.com/api/workouts/' + workout._id,
      { method: "DELETE" }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success("Workout deleted!");
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="workout-details" key={workout._id} >
        <h2>{workout.title}</h2>
        <p>
          <b>Load (kg):</b> {workout.loads}
        </p>
        <p>
          <b>Reps :</b> {workout.reps}
        </p>
        <p className="date">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <i className="ri-delete-bin-2-line" onClick={handleDelete}></i>
      </div>
    </>
  );
}

export default WorkoutDetail;
