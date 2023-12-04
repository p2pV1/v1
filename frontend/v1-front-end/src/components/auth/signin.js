import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../landing/ui/header";

export default function SignIn({ backendUrl, setIsAuthenticated, onSignInSuccess }) {
  console.log("Backend URL:", backendUrl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 

  // Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage("");
    setIsLoading(true);

    // Basic validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (password.length < 2) {
      setErrorMessage("Password must be at least 10 characters long.");
      setIsLoading(false);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    const formData = { username: email, password: password };

    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include", // Required for cookies
      });

      const data = await response.json();

      if (response.ok) {
        console.log("success from sign in component")
        onSignInSuccess();
        navigate("/welcome");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <section className="relative h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-5xl font-bold leading-tight tracking-tighter">
                Sign In
              </h1>
            </div>

            <div className="max-w-sm mx-auto">
              {/* Display error message */}
              {errorMessage && (
                <div className="mb-4 text-center text-red-500">{errorMessage}</div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-input w-full" placeholder="you@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" type="password" className="form-input w-full" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span className="text-sm ml-2">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
