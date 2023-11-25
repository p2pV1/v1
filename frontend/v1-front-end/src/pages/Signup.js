import React, { useState } from "react";
import { Link } from "react-router-dom";
//import AnimationRevealPage from "./helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "../images/final_logotransp.png";
import googleSignInImageSrc from "../images/google-icon.png"; // Import the Google sign-in button image

import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const Container = tw(
  ContainerBase
)`min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-orange-400 text-white font-medium flex justify-center -m-8 `;
const Content = tw.div`max-w-screen-md m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex-col`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-20 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const FieldContainer = tw.div`flex flex-wrap -mx-3 mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default ({
  logoLinkUrl = "#",
  headingText = "Sign Up For The Timeless Tutor",
  socialButtons = [
    {
      iconImageSrc: googleSignInImageSrc,
      text: "Sign Up With Google",
      url: "URL_TO_GOOGLE_OAUTH", // Replace with your Google OAuth URL
    },
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  signInUrl = "/login",
  backendUrl,
}) => {
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
      },
    };


    const apiUrl = backendUrl ? `${backendUrl}/api/register` : "http://localhost:8080/api/register";

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
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/;Secure;SameSite=None`;
  }

  // Function to get the CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }
  return (
    <div>
      <Container>
        <Content>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img
                        src={socialButton.iconImageSrc}
                        className="icon"
                        alt=""
                      />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer>
              <Form onSubmit={handleSubmit}>
                <FieldContainer>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    placeholder="you@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FieldContainer>

                <FieldContainer>
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    placeholder="Password (at least 10 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FieldContainer>
                <FieldContainer>
                  <Label>Phone Number:</Label>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FieldContainer>
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by The Timeless Tutor's{" "}
                  <Link to="#">Terms of Service</Link>
                </p>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link
                    to={signInUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign In
                  </Link>
                </p>
              </Form>
            </FormContainer>
          </MainContent>
        </Content>
      </Container>
   </div>
  );
};
