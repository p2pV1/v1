import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";
import logo from "../../images/final_logotransp.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  flex justify-between items-center
`;

export const NavLinks = tw.div`inline-block`;

export const NavLink = tw(Link)`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
  text-white bg-opacity-50 bg-black px-2 py-1 rounded
`;


export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0! mr-12!`};
  img {
    ${tw`w-24 mr-3`}
  }
`;


export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;

export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300 p-3
`;


export const DesktopNavLinks = tw.nav`
  flex flex-1 justify-center items-center p-4
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
     
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};
