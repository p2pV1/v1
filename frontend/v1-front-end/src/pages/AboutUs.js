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
// import MainFeature1 from "components/features/TwoColWithButton.js";
// import Features from "components/features/ThreeColSimple.js";
// import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

// import SupportIconImage from "images/support-icon.svg";
// import ShieldIconImage from "images/shield-icon.svg";
// import CustomerLoveIconImage from "images/simple-icon.svg";

// const Subheading = tw.span`uppercase tracking-wider text-sm`;

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
        {/* <MainFeature1
        subheading={<Subheading>About The Timeless Tutor</Subheading>}
        heading="We are a modern design agency."
        buttonRounded={false}
        primaryButtonText="See Portfolio"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="We aim to disrupt the design space."
        buttonRounded={false}
        primaryButtonText="Contact Us"
        imageSrc="https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80"
        textOnLeft={false}
      /> */}
        {/* <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
        ]}
        linkText=""
      /> */}
        {/* <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} /> */}

        <Footer />
      </AnimationRevealPage>
    </div>
  );
};
