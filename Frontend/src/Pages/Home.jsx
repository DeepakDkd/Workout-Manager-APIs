import React, { useEffect } from "react";
import WorkoutDetail from "../Components/WorkoutDetail";
import WorkoutForm from "../Components/WorkoutForm";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";
import { motion } from "framer-motion";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/workouts/");

        if (!response.ok) {
          throw Error(response.status);
        }
        const json = await response.json();

        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Fetching data failed!", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="home">
        <WorkoutForm />
      <div className="container">
        {workouts &&
          workouts.map((workout, i) => (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              key={workout._id}
            >
              <WorkoutDetail workout={workout} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default Home;
