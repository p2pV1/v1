import React, { useState } from "react";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CSRF_TOKEN = getCookie("csrftoken");

    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    };

    const formData = {
      username: email,
      password: password,
      rememberMe: rememberMe,
    };

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData.data;

        // Set the token in a cookie
        setCookie("auth_token", token, 7); // Expires in 7 days

        console.log("Login successful!");

        navigate("/welcome");
        // Perform any necessary actions after successful login (e.g., redirect)
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Function to get the CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }

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
