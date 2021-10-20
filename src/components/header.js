import React from "react";
import styled from "styled-components";
// import logo from "../images/logo.png";
import roseLogo from "../images/rose-logo.png";
import memberImg from "../images/member.png";

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
  /* overflow: hidden; */
`;

const DeskHeaderDiv = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  background-color: #fff;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.a`
  width: 100px;
  /* margin: 0 0 -2%; */
  /* margin-left: 60px;
  margin-top: 26px; */
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

const DeskTag = styled.a`
  letter-spacing: 2px;
  font-size: 20px;
  color: #3f3a3a;
  line-height: 28px;
  margin: 0 24px;
  &:hover {
    text-decoration: none;
    color: #8b572a;
    cursor: pointer;
    /* border-bottom: 2px solid #8b572a; */
  }
`;

const Member = styled.div`
  margin-left: 42px;
  margin-right: 54px;
  cursor: pointer;
`;

const MobileHeaderDiv = styled.div`
  display: none;
  @media (max-width: 768px) {
    height: 110px;
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
const MobileTag = styled.div`
  @media (max-width: 768px) {
    font-size: 18px;
    color: #828282;
    flex-grow: 1;
    text-align: center;
    margin: 2px 8px 8px 8px;
  }
`;

export default function Header() {
  return (
    <Navbar>
      <Container>
        <DeskHeaderDiv>
          <Logo href="./">
            <img src={roseLogo} alt="logo" height="64" />
          </Logo>
          <DeskNav>
            <DeskTag href="./?tag=women">Invatation</DeskTag>

            <DeskTag href="./?tag=men">Guest List</DeskTag>

            <DeskTag href="./?tag=accessories">Table</DeskTag>
          </DeskNav>

          <Member>
            <img src={memberImg} height="44" alt="member" />
          </Member>
        </DeskHeaderDiv>
        <MobileHeaderDiv>
          <Logo href="./">
            <img src={roseLogo} height="48" alt="logo" />
          </Logo>

          <MobileNav>
            <MobileTag href="./?tag=women">Invatation</MobileTag>
            {/* <MobileTagLine>|</MobileTagLine> */}
            <MobileTag href="./?tag=men">Guest List</MobileTag>
            {/* <MobileTagLine>|</MobileTagLine> */}
            <MobileTag href="./?tag=accessories">Table</MobileTag>
          </MobileNav>
        </MobileHeaderDiv>
      </Container>
    </Navbar>
  );
}
