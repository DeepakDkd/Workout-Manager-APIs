import { createContext, useContext, useReducer } from "react";
import { workout } from "../../../Backend/Models/workoutModel";

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w)=> w._id != action.payload._id)
      };
      case "CLEAR_CONTEXT":
        return{
          workouts:[]
        }
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, { workouts: [] });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkoutContext = ()=>{
  return useContext(WorkoutContext)
}
 
