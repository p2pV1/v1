import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "../images/login-illustration.svg";
import logo from "../images/final_logotransp.png";
import googleIconImageSrc from "../images/google-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";

const Container = tw(
  ContainerBase
)`min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-orange-400 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-md m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 p-6 sm:p-12 flex-col`;
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
const RememberMeContainer = tw.div`flex justify-start items-center mt-4`;
const RememberMeLabel = tw.label`text-gray-700 text-sm`;
const RememberMeCheckbox = tw.input`
  mr-2 border border-gray-400 rounded w-5 h-5 text-primary-500 appearance-none transition-colors duration-200 ease-in-out checked:bg-primary-500 checked:border-primary-500 focus:ring-1 ring-offset-1 ring-offset-primary-200 ring-primary-300
`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const logCookies = () => {
  const allCookies = document.cookie;
  console.log("All available cookies:", allCookies);
};


export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign In To The Timeless Tutor",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",
  backendUrl,
}) => {
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

    // Use backendUrl from props, fallback to localhost if not provided
    const apiUrl = backendUrl || "http://localhost:8080";
    {console.log(backendUrl + "this is the backend url")}
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include",


      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData.data;
        // setCookie("auth_token", token, 7); // Expires in 7 days
        navigate("/welcome");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    logCookies();
  };

  // function setCookie(name, value, days) {
  //   const expires = new Date(
  //     Date.now() + days * 24 * 60 * 60 * 1000
  //   ).toUTCString();
  //   document.cookie = `${name}=${value};expires=${expires};path=/;Secure;SameSite=None`;
  // }

  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <SocialButtonsContainer>
                
                
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign in with your e-mail</DividerText>
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
                <RememberMeContainer>
                  <RememberMeCheckbox
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <RememberMeLabel htmlFor="remember_me">
                    Remember Me
                  </RememberMeLabel>
                </RememberMeContainer>
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
              <p tw="mt-6 text-xs text-gray-600 text-center">
                <a
                  href={forgotPasswordUrl}
                  tw="border-b border-gray-500 border-dotted"
                >
                  Forgot Password ?
                </a>
              </p>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <Link
                  to={signupUrl}
                  tw="border-b border-gray-500 border-dotted"
                >
                  Sign Up
                </Link>
              </p>
            </FormContainer>
          </MainContent>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

