import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD:frontend/v1-front-end/src/components/auth/signin.js

import { loginUser } from "../redux/user/userSlice";
=======
import { loginUser } from "../../components/redux/user/userSlice";
>>>>>>> 13ccd38fac2402f3499af4f9d9c8b347c8c1eba4:frontend/v1-front-end/src/pages/auth/signin.js
import { useAuth } from "../../hooks/useAuth"; // Ensure this path is correct

import Header from "../../components/landing/ui/header";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Ensure useAuth is properly implemented
  const { backendUrl } = useSelector((state) => state.backendUrl);

  // State for form inputs and loading/error states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate email format
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

    // Dispatch the loginUser thunk action
    dispatch(loginUser({ email, password, backendUrl }))
      .unwrap()
      .then(() => {
        if (typeof setIsAuthenticated === "function") {
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
      <section className="relative">
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
                <div className="mb-4 text-center text-red-500">
                  {errorMessage}
                </div>
              )}
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button className="px-8 py-3 text-white bg-orange-600 hover:bg-orange-700 w-full relative flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <span className="flex-auto pl-16 pr-8 -ml-16">
                        Sign in with Google
                      </span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-700 border-dotted grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-gray-400">Or, sign in with your email</div>
                <div
                  className="border-t border-gray-700 border-dotted grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="Enter your email"
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
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
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
                  className="px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
