import { useState } from "react";

import Header from "../landing/ui/header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignUp() {
  const { backendUrl } = useSelector((state) => state.backendUrl);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      email: email || null,
      password: password || null,
      username: email,
      profile: {
        phone: phoneNumber || null,
        sub: "1",
        verified_at: "2023-09-29",
      },
    };

    const apiUrl = backendUrl
      ? `${backendUrl}/api/register`
      : "http://localhost:8080/api/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData.data; // Extract the token

        headers.Authorization = `Token ${token}`;
        console.log("Signup successful!");
        navigate("/welcome");
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
    <>
      <Header />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-5xl font-bold leading-tight tracking-tighter">
                Sign Up
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
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
                        Sign up with Google
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
                <div className="text-gray-400">
                  Or, register with your email
                </div>
                <div
                  className="border-t border-gray-700 border-dotted grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
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
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="Password (at least 10 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="phone-number"
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone-number"
                      type="tel"
                      className="py-3 px-4 placeholder-gray-400 w-full text-gray-700 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="Phone Number (+1 234 567 8900)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  I agree to abide thetimelesstutor's
                  <Link
                    href="#"
                    className="ml-1 underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 w-full">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
