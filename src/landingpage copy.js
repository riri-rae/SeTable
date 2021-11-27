import React, { useState } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import { alert } from "./utils/alert";
import ScrollButton from "./components/scrollbutton"

const Bg = styled.div`
  background-image: url("/images//images/landingpagebg.jpeg");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;


const Left2 = styled.div`
  background-color: #e8e4de;
   height: 1500px; 
`;
const Wrapper = styled.div`
  background-color: #e8e4de;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  overflow-Y: scroll; 
   /* height: 1500px;  */
`;

const H1 = styled.h1`
  width: 100%;
  /* border: 1px solid #000; */
  text-align: center;
  margin-bottom: 5rem;
  color: #fff;
  font-size: 10vw;
  letter-spacing: 4px;
  font-family: "Libre Baskerville", serif;
  font-weight: lighter;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/images/landingpagebg.jpeg");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  /* height: 100vh; */

`;

const Right = styled.div`
  border: 1px solid #ccc;
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  justify-content: center;
`;

const MainTitle = styled.div`

`

const Input = styled.input`
  /* width: 100%; */
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
  margin: 2rem 5rem;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
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
  font-size: 13px;
  border: none;
  cursor: pointer;
  margin: 0 5rem;
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
    }

    function onSubmit() {
        if (activeItem === "signup") {
            if (name === "" || email === "" || password === "") { alert("Something Missing!", "Please check your infomation again", "warning"); }
            else {
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
            if (email === "" || password === "") { alert("Something Missing!", "Please check your infomation again", "warning"); }
            else {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        switch (error.code) {
                            case "auth/invalid-email":
                                alert("Invalid email format", "Please check again", "warning");
                                break;
                            case "auth/user-not-found":
                                alert("Can not find this user", "Please check again", "warning");
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
                <MainTitle>Login</MainTitle>
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
                <div>Signup</div>
                <Input
                    type="text"
                    placeholder="Name"
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
        <>
            <Wrapper>
                <Left>
                    <H1>Once in a lifetime</H1>
                    <ScrollButton />
                </Left>
                <Right>{activeItem === "login" ? loginDiv() : signupDiv()}</Right>

            </Wrapper>
            <Left2 />


        </>
    );
};

export default LandingPage;
