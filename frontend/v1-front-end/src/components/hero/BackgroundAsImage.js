import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import heroBackgroundImage from "../../images/HeroBackground.png";
import { Link } from "react-router-dom";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`fixed top-0 w-full z-40 py-2 bg-black bg-opacity-75 backdrop-blur-lg transition-all duration-300`}

  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-white hover:border-gray-300 hover:text-gray-400 transition-all duration-300`}
  }
  
  ${NavToggle}.closed {
    ${tw`text-white hover:text-primary-500 transition-all duration-300`}
  }
`;

const Container = styled.div`
  ${tw`relative bg-center bg-no-repeat min-h-screen pt-16 w-full`}
  width: 100vw; /* take full width */
  background-image: url(${heroBackgroundImage});
  background-size: cover;
`;



const OpacityOverlay = tw.div`absolute inset-0 bg-black opacity-25`;

const HeroContainer = tw.div`relative px-4 sm:px-8 max-w-screen-xl mx-auto py-20`;
const Column = tw.div`flex flex-col justify-center items-center space-y-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-300 transform hover:scale-105`}
  span {
    ${tw`block mt-4`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-orange-500 px-3 py-1`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-white transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`block pl-3 py-1 text-white border-l-4 border-primary-500 font-medium text-sm shadow-md`;

const PrimaryAction = tw.button`px-8 py-3 mt-4 text-base bg-primary-500 text-white font-bold rounded-full shadow-lg transition duration-300 hover:bg-primary-700 hover:text-white focus:shadow-outline transform hover:scale-105`;

export default () => {
  const navLinks = [
    <NavLinks key={1}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/login">Login</NavLink>
      <PrimaryLink to="/signup">Sign Up</PrimaryLink>
    </NavLinks>
  ];

  return (
    <Container>
      <OpacityOverlay />
      <StyledHeader links={navLinks} />
      <HeroContainer>
        <Column>
          <Notification>Personalized mentor recommendations for you!</Notification>
          <Heading>
            <span>Discover Your Ideal Mentor</span>
            <SlantedBackground>Empowered by AI</SlantedBackground>
          </Heading>
          <PrimaryAction as={Link} to="/signup">
            Get Started
          </PrimaryAction>
        </Column>
      </HeroContainer>
    </Container>
  );
};
