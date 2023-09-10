import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // If not needed, you can remove this line

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CSRF_TOKEN = getCookie("csrftoken"); // Define this function to get the CSRF token

    const headers = {
      'accept': 'application/json',
      "content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    };
    console.log(CSRF_TOKEN);
    const formData = {
      email,
      password,
      phoneNumber,
    };

    try {
<<<<<<< HEAD:frontend/v1-front-end/src/components/Signup.js
      const response = await fetch(
        "http://localhost:8000/registration/register",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        }
      );
=======
      const response = await fetch("http://localhost:8000/registration/register", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });
>>>>>>> b5323b17a2afb361c32d1804a0f33cee21646a37:frontend/v1-front-end/src/Signup/Signup.js

      if (response.ok) {
        console.log("Signup successful!");
      } else {
        console.error("Signup failed");
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

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="signup-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            className="signup-input"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="toggle-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}