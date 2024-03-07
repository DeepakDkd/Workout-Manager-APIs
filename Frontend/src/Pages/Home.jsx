import React, { useEffect } from "react";
import WorkoutDetail from "../Components/WorkoutDetail";
import WorkoutForm from "../Components/WorkoutForm";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";

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
      <div className="container">
        {workouts &&
          workouts.map((workout) => (
            <div key={workout._id}>
              <WorkoutDetail workout={workout} />
            </div>
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
