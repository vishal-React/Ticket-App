import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [eye, seteye] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
      }
      setLoading(false); 
    });

    return () => unsubscribe(); // Cleanup function
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Optionally, set a role in localStorage for later use
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

  if (loading) {
    return <p>Loading...</p>; 
  }

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
