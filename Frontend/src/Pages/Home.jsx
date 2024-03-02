import React, { useEffect, useState } from "react";
import WorkoutDetail from "../Components/WorkoutDetail";
import WorkoutForm from "../Components/WorkoutForm";

function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/workouts/");

        if (!response.ok) {
          throw Error(response.status);
        }
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Fetching data failed!", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      
      <div className="container">
       {
        workouts && workouts.map((workout)=>(
          <p key={workouts._id}><WorkoutDetail workout={workout}/></p>
        ))
       }
      </div>
      <WorkoutForm/>
    </div>
  );
}

export default Home;
