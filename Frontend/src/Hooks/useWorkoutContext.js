import { useContext } from "react";
import { WorkoutContext } from "../Context/WorkoutContext";

export  const useWorkoutContext = () => {
    const  context = useContext(WorkoutContext);
  
    if (!context) {
      throw new Error("This component must be used within the WorkoutProvider");
    }
  
    return context;
}