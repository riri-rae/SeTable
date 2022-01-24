import React from 'react'
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import useDropdown from '../utils/useDropdown'
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RiLogoutCircleRLine } from "react-icons/ri";
import roseLogo from "../images/rose-logo.png";
import { reConfirm, alertWithTimer } from "../utils/alert";

const MobileHeaderDiv = styled.div`
  display: none;
  @media (max-width: 768px) {
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
  &:active {
    color: none;
  }
  &:focus {
    outline: none;
  }
`;
const Logo = styled(NavLink)`
  width: fit-content;
  margin-top: 4px;
  margin-right: 8px;

  &:active {
    color: none;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-top: 2vh;
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


const Dropdown = () => {
    const [isOpen, toggle] = useDropdown();

    function confirmLogout() {
        reConfirm("Logging out?", "Are you sure you want to log out?", "Yes!").then(
            (result) => {
                if (result.isConfirmed) {
                    alertWithTimer(
                        "Logged out successfully",
                        "Hope to see you soon!",
                        "success"
                    );
                    firebase.auth().signOut();
                }
            }
        );
    }

    return (
        <div className={isOpen ? 'block' : 'hidden'} onClick={toggle}>
            <MobileHeaderDiv>
                <Logo to="/homepage">
                    <img src={roseLogo} alt="logo" height="44" />
                </Logo>
                <MobileNav>
                    <MobileTag to="/invitation-edit">Invitation</MobileTag>
                    <MobileTag to="/guestlist">Guest List</MobileTag>
                    <MobileTag to="/table">Table</MobileTag>
                    <LogoutIcon onClick={confirmLogout}></LogoutIcon>
                </MobileNav>
            </MobileHeaderDiv>
        </div>
    )
}

export default Dropdown
