import "./login.css";
import { useState, useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Room from "@mui/icons-material/Room";
import { apiUrl } from "../../shared";
import axios from "axios";

const Login = ({ setShowLogin, setCurrentUser }) => {
  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(`${apiUrl}/users/login`, user);
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data);
      setError(null);
      setShowLogin(false);
    } catch (error) {
      setError({
        error: true,
        message: error.response.data,
      });
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room /> Travel App
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="username" ref={usernameRef} required />
        <input type="password" placeholder="password" ref={passwordRef} required />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <span className="failure">{error.message}</span>}
      </form>
      <CancelIcon className="cancelRegister" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
