import React, { useEffect, useState } from "react";
import WorkoutDetail from "../Components/WorkoutDetail";
import WorkoutForm from "../Components/WorkoutForm";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";

function Home() {

  const {workouts , dispatch} = useWorkoutContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/workouts/");

        if (!response.ok) {
          throw Error(response.status);
        }
        const json = await response.json();
        console.log(json)
        dispatch({type:"SET_WORKOUTS" , payload:json})
      } catch (error) {
        console.error("Fetching data failed!", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="home">
      
      <div className="container">
       {
        workouts && workouts.map((workout)=>(
          <p key={workout._id}><WorkoutDetail workout={workout}/></p>
        ))
       }
      </div>
      <WorkoutForm/>
    </div>
  );
}

export default Home;
