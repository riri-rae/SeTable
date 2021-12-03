import React from "react";
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import firebase from "../utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import roseLogo from "../images/rose-logo.png";
import { reConfirm, alertWithTimer } from "../utils/alert";
import { RiLogoutCircleRLine } from "react-icons/ri";


const Navbar = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px -5px 10px rgb(0 0 0 / 30%);
  z-index: 100;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #3f3a3a;

`;

const DeskHeaderDiv = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled(NavLink)`
  width: fit-content;
  margin-top: 4px;
  margin-right: 8px;

  &:active{
    color:none;
  }
  &:focus{
    outline:none;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-top:2vh;
  }
`;

const DeskNav = styled.div`
  display: flex;
  margin-left: 16px;
  margin-right: 16px;
`;

const DeskTag = styled(NavLink)`
  letter-spacing: 2px;
  font-size: 20px;
  color: #3f3a3a;
  line-height: 28px;
  margin: 0 24px;

  &:hover {
    text-decoration: none;
    color: #8b572a;
    cursor: pointer;
  }
  &:active{
    color:none;
  }
  &:focus{
    outline:none;
  }
`;

const LogoutIcon = styled(RiLogoutCircleRLine)`
  font-size: 24px;
  margin: 0 4px;
  color: #695f5f;
  cursor: pointer;
  &:hover {
    color: #d48c70;
  }
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const MobileHeaderDiv = styled.div`
  display: none;
  @media (max-width: 768px) {
    /* height: 110px; */
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    top: 0;
    z-index: 99;
    background-color: #fff;
    flex-direction: column;
  }
`;

const MobileNav = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const MobileTag = styled(NavLink)`
  @media (max-width: 768px) {
    font-size: 18px;
    color: #828282;
    flex-grow: 1;
    text-align: center;
    margin: 2px 8px 8px 8px;
  }
  &:hover {
    text-decoration: none;
    color: #8b572a;
    cursor: pointer;
  }
  &:active{
    color:none;
  }
  &:focus{
    outline:none;
  }
`;

export default function Header() {

  function confirmLogout() {
    reConfirm('Logging out?', "Are you sure you want to log out?", "Yes!")
      .then((result) => {
        if (result.isConfirmed) {
          alertWithTimer('Logged out successfully', 'Hope to see you soon!', 'success')
          firebase.auth().signOut()
        }
      })
  }

  return (
    <Navbar>
      <Container>
        <DeskHeaderDiv>
          <Logo to="/homepage">
            <img src={roseLogo} alt="logo" height="44" />
          </Logo>
          <DeskNav>
            <DeskTag to="/invitation-edit"
              activeStyle={{ color: "#8b572a" }}
            >Invitation</DeskTag>
            <DeskTag to="/guestlist"
              activeStyle={{ color: "#8b572a" }}
            >Guest List</DeskTag>
            <DeskTag to="/table"
              activeStyle={{ color: "#8b572a" }}
            >Table</DeskTag>
          </DeskNav>

          <LogoutIcon
            onClick={confirmLogout}>
          </LogoutIcon>
        </DeskHeaderDiv>

        <MobileHeaderDiv>
          <Logo to="/homepage">
            <img src={roseLogo} alt="logo" height="44" />
          </Logo>
          <MobileNav>
            <MobileTag to="/invitation-edit">Invitation</MobileTag>
            <MobileTag to="/guestlist">Guest List</MobileTag>
            <MobileTag to="/table">Table</MobileTag>
            <LogoutIcon
              onClick={confirmLogout}>
            </LogoutIcon>
          </MobileNav>
        </MobileHeaderDiv>
      </Container>
    </Navbar>
  );
}