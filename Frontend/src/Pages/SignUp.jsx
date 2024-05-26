import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../Hooks/useSignUp";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const status = await useSignup(name, email, password, setError);
      console.log(status);
      if (status) {
        toast.success("Registration Successful");
        navigate("/");
      }
      if (!status && error) {
        toast.error(error);
      }
    } catch (e) {
      console.log("Error during SignUp", e);
      setError(e);
    }
  };

  return (
    <div className="signup-page">
      <h1 className="text-5xl">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
