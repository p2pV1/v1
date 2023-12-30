import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user/userSlice";
import { useAuth } from "../../hooks/useAuth"; // Ensure this path is correct

import Header from "../landing/ui/header";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Ensure useAuth is properly implemented
  const { backendUrl } = useSelector((state) => state.backendUrl);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      setErrorMessage("Password must be at least 3 characters long.");
      setIsLoading(false);
      return;
    }

    dispatch(loginUser({ email, password, backendUrl }))
      .unwrap()
      .then(() => {
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(true); // Ensure setIsAuthenticated is a function
          navigate("/welcome");
        } else {
          console.error("setIsAuthenticated is not a function");
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      })
      .catch((error) => {
        const message = error.message || "Login failed. Please try again.";
        setErrorMessage(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              {errorMessage && (
                <div className="mb-4 text-center text-red-500">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full"
                      placeholder="you@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-sm ml-2">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
