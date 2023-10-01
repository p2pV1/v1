import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CSRF_TOKEN = getCookie("csrftoken");

    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    };

    const formData = {
      email: email || null,
      password: password || null,
      username: email,
      profile: {
        phone: phoneNumber || null,
        sub: "1",
        verified_at: "2023-09-29",
      }
    };

    try {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      const response = await fetch("http://localhost:8000/api/register", {
>>>>>>> 488951ebfcb9a3e5b5b0f371993f867bbc858694
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });
>>>>>>> 4bae44817e9c343917e84898ecbdedd1704b636b

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData.data; // Extract the token

        // Set the token in a cookie
        setCookie("auth_token", token, 7); // Expires in 7 days

        console.log("Signup successful!");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
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
