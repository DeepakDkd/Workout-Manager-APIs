import React from "react";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";

function WorkoutDetail({ workout }) {
  const { dispatch } = useWorkoutContext();
  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:8089/api/workouts/" + workout._id,
      { method: "DELETE" }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h2>{workout.title}</h2>
      <p>
        <b>Load (kg):</b> {workout.reps}
      </p>
      <p>
        <b>Reps :</b> {workout.reps}
      </p>
      <p className="date">{workout.createdAt.split("T")[0]}</p>
      <i className="ri-delete-bin-2-line" onClick={handleDelete}></i>
    </div>
  );
}

export default WorkoutDetail;
