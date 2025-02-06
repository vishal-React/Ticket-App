// src/pages/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [eye, seteye] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Optionally, set a role in local storage for later use (here we use email to determine role)
      if (email === "customer@support.com") {
        localStorage.setItem("role", "customer");
      } else {
        localStorage.setItem("role", "agent");
      }
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const show = () => {
    seteye(!eye);
  };

  return (
    <div className="Formcenter">
      <form onSubmit={handleLogin} className="loginForm">
        <p className="logo">Login</p>

        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={eye ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />

        {eye ? (
          <p className="login " onClick={show}>
            Hide Password
          </p>
        ) : (
          <p className="login" onClick={show}>
            Show Password
          </p>
        )}

        <button className="create-account">Log In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
