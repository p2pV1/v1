import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    //side effects e.g. check if user is logged in
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic

    console.log("Login form submitted with:", email, password, rememberMe);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-options">
            <div className="login-remember">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="login-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember_me" className="login-label">
                Remember me
              </label>
            </div>
            <div className="login-forgot">
              <Link to="/forgot-password" className="login-link">
                Forgot your password?
              </Link>
            </div>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <p className="toggle-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
