import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const state = await useLogin(email, password, setError);
      console.log(state);
      if (state) {
        toast.success("Logged In Successfully");
        navigate("/");
      }

      if(!state || error){

        toast.error( error);

      }
    } catch (e) {
      console.log("Error during  login", e);
      setError(e);
    }
  };
  return (
    <div className="login-page">
      <Toaster position="top-center" />
      <h1 className="text-5xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="text"
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have any account? <Link to="/signup">Sign In</Link>
      </p>
    </div>
  );
}

export default Login;
