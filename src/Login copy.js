import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoginForm } from "../src/components/accountBox/loginForm";
import { motion } from "framer-motion"
import { AccountContext } from "../src/components/accountBox/accountContext";
import { SignupForm } from "../src/components/accountBox/signupForm";
// const H1 = styled.h1`
// width: 100%;
// text-align: center;
// margin-bottom: 5rem;
// `;

// const Button = styled.button`
// margin-top: 2rem;
// `;

// const Right = styled.div`
//  /* border: 1px solid #000;
//  display: flex;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center; */
// `;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  /* box-shadow: 0 0 2px rgba(15, 15, 15, 0.28); */
  position: relative;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;

`;

const TopContainer = styled.div`
  width: 100%;
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
  
   
`;

const BackDrop = styled(motion.div)`
  width: 100%;
  height: 950px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(266deg);
  top: -290px;
  left: -90px;
  background: rgb(244,185,184);
  background: linear-gradient(315deg, rgba(244,185,184,1) 0%, rgba(235,187,176,1) 35%, rgba(212,140,112,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 24px
;
`;

const HeaderText = styled.h2`
  font-size: 60px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
    expanded: {
        width: "350%",
        height: "200%",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "120%",
        height: "950px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};


const Login = () => {
    // const [activeItem, setActiveItem] = useState('');
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 500);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 500);
    };

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AccountContext.Provider value={contextValue}>

            <BoxContainer>
                <TopContainer>
                    <BackDrop
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === "signin" && (
                        <HeaderContainer>
                            <HeaderText>Welcome to</HeaderText>
                            <HeaderText>SeTable</HeaderText>
                            <SmallText>Please sign-in to continue!</SmallText>
                        </HeaderContainer>
                    )}
                    {active === "signup" && (
                        <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please sign-up to continue!</SmallText>
                        </HeaderContainer>
                    )}
                </TopContainer>
                <InnerContainer>
                    {active === "signin" && <LoginForm />}
                    {active === "signup" && <SignupForm />}
                </InnerContainer>
            </BoxContainer>

        </AccountContext.Provider>

    );
}

export default Login;