import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import bottomBackgroundImage from "../../images/BottomBackground.jpg";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${bottomBackgroundImage});
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SubHeading = styled.p`
  ${tw`mt-4 text-center text-sm sm:text-base lg:text-lg xl:text-xl font-medium leading-relaxed text-gray-100`};
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default () => {
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <Content>
          <Heading>
            Unlock your potential
            <br />
            with Mentorship.
          </Heading>
          <SubHeading>
            Discover the benefits of mentorship and unlcuck your potential. Our
            AI-driven mentor matching process ensures you find the right mentor
            to guide you on your journey.
          </SubHeading>
          <PrimaryAction>
            <Link to="/signup">Get Started With Mentorship</Link>
          </PrimaryAction>
        </Content>
      </HeroContainer>
    </Container>
  );
};
