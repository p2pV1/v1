import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CSRF_TOKEN = getCookie("csrftoken"); // Define this function to get the CSRF token

<<<<<<< HEAD
    console.log("Login form submitted with:", email, password, rememberMe);

    if (isLoginSuccessful) {
      navigate("/welcome");
      setIsLogin(true);
    }
  };
=======
    const headers = {
      'accept': 'application/json',
      "content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    };

    const formData = {
      email,
      password,
      rememberMe,
    };

    try {
      const response = await fetch("http://localhost:8000/registration/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      if (response.ok) {
        console.log("Login successful!");
        // Perform any necessary actions after successful login (e.g., redirect)
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to get the CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }
>>>>>>> 4bae44817e9c343917e84898ecbdedd1704b636b

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
