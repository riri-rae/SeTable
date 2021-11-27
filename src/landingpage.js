import React, { useState } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import { alert } from "./utils/alert";
import ScrollButton from "./components/scrollbutton";

const Container = styled.div`
  background-color: #e8e4de;
  letter-spacing: 2px;
`;

const WrapperTop = styled.div`
  max-width: 100vw;
  min-height: 100vh;
`;

const MainBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/images/landingpagebg.jpeg");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;

  /* &:before {
    content: "";
    background-image: url(${"/images/landingpagebg.jpeg"});
    background-position-x: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
    opacity: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute; 
    z-index: -1;
  }  */
`;

const TopContent = styled.div`
  width: 80%;
  color: #fff;
  letter-spacing: 4px;
  font-family: "Libre Baskerville", serif;
  /* font-weight: lighter; */
`;

const TopTitleMain = styled.div`
  font-size: 10rem;
  line-height: 12rem;
`;

const TopTitleSub = styled.div`
  font-size: 5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  line-height: 10rem;
`;

const WrapperBottom = styled(WrapperTop)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 5rem;
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  font-size: 1rem;
  margin: 3rem;
  width: calc(100vw - 400px);
`;

const IntroduceTitle = styled.div`
  white-space: pre-wrap;
  text-align: left;
  font-size: 3rem;
  margin: 3rem 0;
`;

const IntroduceText = styled.div`
  text-align: left;
  font-size: 1.2rem;
  line-height: 2.8rem;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SignIn = styled.div`
  border: 1px solid #ccc;
  display: flex;
  min-width: 400px;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 25rem;
`;

const SignInTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

const Input = styled.input`
  width: 256px;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 4px;
  padding: 0px 20px;
  margin: 0 5rem;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 16px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(244, 185, 184);
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1rem;
  margin: 2rem;
  color: #fff;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 600;
  width: 10rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all, 0.3s ease-in-out;
  background: rgb(244, 185, 184);
  background: linear-gradient(
    315deg,
    rgba(244, 185, 184, 1) 0%,
    rgba(235, 187, 176, 1) 35%,
    rgba(212, 140, 112, 1) 100%
  );
  &:hover {
    filter: brightness(1.05);
  }
`;

const SwitchButton = styled.button`
  font-size: 14px;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  color: #574e56;
  background-color: rgb(0 0 0 / 0%);
  &&:hover {
    color: #391306;
  }
`;

const LandingPage = () => {
    const [activeItem, setActiveItem] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const enterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSubmit();
        }
    };

    function onSubmit() {
        if (activeItem === "signup") {
            if (name === "" || email === "" || password === "") {
                alert(
                    "Something Missing!",
                    "Please check your infomation again",
                    "warning"
                );
            } else {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        const user = firebase.auth().currentUser;
                        console.log(user.uid, name, user.email);
                        setUserInfo(user);
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case "auth/invalid-email":
                                alert("Invalid email format", "Please check again", "warning");
                                break;
                            case "auth/weak-password":
                                alert(
                                    "Invalid password format",
                                    "Password must be at least 6 characters long",
                                    "warning"
                                );
                                break;
                            case "auth/email-already-in-use":
                                alert(
                                    "This mailbox has been registered",
                                    "Please try another one",
                                    "warning"
                                );
                                break;
                            default:
                        }
                        // isLoading(false);
                    });
            }
        } else if (activeItem === "login") {
            if (email === "" || password === "") {
                alert(
                    "Something Missing!",
                    "Please check your infomation again",
                    "warning"
                );
            } else {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        switch (error.code) {
                            case "auth/invalid-email":
                                alert("Invalid email format", "Please check again", "warning");
                                break;
                            case "auth/user-not-found":
                                alert(
                                    "Can not find this user",
                                    "Please check again",
                                    "warning"
                                );
                                break;
                            case "auth/wrong-password":
                                alert("Wrong Password", "Please check again", "warning");
                                break;
                            default:
                        }
                        // isLoading(false);
                    });
            }
        }
    }

    const db = firebase.firestore();

    function setUserInfo(user) {
        db.collection("users").doc(user.uid).set({
            uid: user.uid,
            name,
            email: user.email,
            guestlist: "[[]]",
        });
    }

    const loginDiv = () => {
        return (
            <FormContainer>
                <SignInTitle>Login</SignInTitle>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => enterKey(e)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    onKeyDown={(e) => enterKey(e)}
                />
                <SubmitButton
                    // type="submit"
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                // loading={isLoading}
                >
                    Login
                </SubmitButton>
                <SwitchButton
                    onClick={() => {
                        setActiveItem("signup");
                        setName("");
                        setEmail("");
                        setPassword("");
                    }}
                >
                    Swtich to Signup
                </SwitchButton>
            </FormContainer>
        );
    };

    const signupDiv = () => {
        return (
            <FormContainer>
                <SignInTitle>Signup</SignInTitle>
                <Input
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => enterKey(e)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => enterKey(e)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => enterKey(e)}
                />
                <SubmitButton
                    // type="submit"
                    onClick={(e) => onSubmit(e)}

                // loading={isLoading}
                >
                    Signup
                </SubmitButton>
                <SwitchButton
                    onClick={() => {
                        setActiveItem("login");
                        setName("");
                        setEmail("");
                        setPassword("");
                    }}
                >
                    Swtich to Login
                </SwitchButton>
            </FormContainer>
        );
    };

    return (
        <Container>
            <WrapperTop>
                <MainBackground>
                    <TopContent>
                        <TopTitleMain>For</TopTitleMain>
                        <TopTitleMain>Once in a lifetime</TopTitleMain>
                        <TopTitleSub>- SeTable -</TopTitleSub>
                    </TopContent>
                    <ScrollButton />
                </MainBackground>
            </WrapperTop>
            <WrapperBottom>
                <Introduce>
                    <IntroduceTitle>
                        {`You focus on the big day,\nleave SeTable to focus on you...`}
                    </IntroduceTitle>
                    <IntroduceText>
                        {`- Edit your custom invitation\n- Get real-time responses from your guests\n- Control your guest list easily\nAnd … the best is … \narrange guests with easy drag and drog to visualize your wedding tables\nno worries from table arrangement everlast!`}
                    </IntroduceText>
                </Introduce>
                <SignIn>{activeItem === "login" ? loginDiv() : signupDiv()}</SignIn>
            </WrapperBottom>
        </Container>
    );
};

export default LandingPage;

// style={{ color: "#A47E84" }}
