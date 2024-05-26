import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Header() {
  const { user, dispatch } = useAuth();
  return (
    <header>
      <Link to="/" className="flex  w-full justify-between">
        <h1 className="text-3xl">Home Workout</h1>
        <div className="my-auto">
          {user ? (
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
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
