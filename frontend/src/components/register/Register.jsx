import Room from "@mui/icons-material/Room";
import axios from "axios";
import { useRef, useState } from "react";
import { apiUrl } from "../../shared";
import CancelIcon from "@mui/icons-material/Cancel";
import "./register.css";

const Register = ({ setShowRegister }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post(`${apiUrl}/users/register`, newUser);
      setError(null);
      setIsSuccess(true);
    } catch (error) {
      setError({
        error: true,
        message: error.response.data,
      });
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room /> Travel App
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="username" ref={usernameRef} required />
        <input type="email" placeholder="email" ref={emailRef} required />
        <input type="password" placeholder="password" ref={passwordRef} required />
        <button type="submit" className="register-button">
          Register
        </button>
        {isSuccess && <span className="success">Successful. You can login now!</span>}
        {error && <span className="failure">{error.message}</span>}
      </form>
      <CancelIcon className="cancelRegister" onClick={() => setShowRegister(false)} />
    </div>
  );
};

export default Register;
