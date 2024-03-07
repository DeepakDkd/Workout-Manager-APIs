import React from "react";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";
import {motion} from "framer-motion"

function WorkoutDetail({ workout }) {
  console.log(workout)
  const { dispatch } = useWorkoutContext();
  const handleDelete = async () => {
    console.log("he")
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
    <motion.div className="workout-details"
    
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      key={workout._id}

    >
      <h2>{workout.title}</h2>
      <p>
        <b>Load (kg):</b> {workout.loads}
      </p>
      <p>
        <b>Reps :</b> {workout.reps}
      </p>
      <p className="date">{workout.createdAt.split("T")[0]}</p>
      <i className="ri-delete-bin-2-line" onClick={handleDelete}></i>
    </motion.div>
  );
}

export default WorkoutDetail;
