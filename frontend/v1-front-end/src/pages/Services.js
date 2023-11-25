import React from "react";
import Header, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Footer from "../components/footers/FiveColumnWithInputForm.js";

const StyledHeader = styled(Header)`
  ${tw`px-4 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
export default () => {
  const navLinks = [
    <NavLinks key={1}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/services">Services</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <NavLink to="/login" tw="lg:ml-12!">
        Login
      </NavLink>
      <PrimaryLink to="/signup">Sign Up</PrimaryLink>
    </NavLinks>,
  ];
  return (
    <div
      css={tw`bg-gradient-to-r from-purple-600 via-purple-500 to-orange-400`}
    >
      <AnimationRevealPage>
        <StyledHeader links={navLinks} />
        <div
          css={tw`flex items-center justify-center font-extrabold bg-white text-primary-500 text-4xl my-8 border border-primary-500 h-56`}
        >
          Under Construction
        </div>

        <Footer />
      </AnimationRevealPage>
    </div>
  );
};
