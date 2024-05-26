import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useWorkoutContext } from "../Context/WorkoutContext";

function Header() {
  const { user, dispatch } = useAuth();
  const {dispatch : workoutdispatch} = useWorkoutContext()
  return (
    <header>
      <Link to="/" className="flex  w-full justify-between">
        <h1 className="text-3xl">Home Workout</h1>
        <div className="my-auto">
          {user ? (
            <button
              onClick={() => {dispatch({ type: "LOGOUT" });workoutdispatch('CLEAR_CONTEXT')}}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={"/login"} className="mx-5">
                Login
              </Link>
              <Link to={"/signup"}>SignUp</Link>
            </>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
