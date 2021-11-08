import React from 'react';
import styled from "styled-components";
import Login from "./Login";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #E8E4DE;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const H1 = styled.h1`
width: 100%;
/* border: 1px solid #000; */
text-align: center;
margin-bottom: 5rem;
`;


const Left = styled.div`
 flex:2;
 /* border: 1px solid #000; */
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

`;


const LandingPage = () => {
    return (
        <Wrapper>
            <Left> <H1>SeTable</H1> </Left>
            <Login />
        </Wrapper>
    );
}

export default LandingPage;