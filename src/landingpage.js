import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { useHistory } from "react-router-dom";

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
const Right = styled.div`
 border: 1px solid #ccc;
 display: flex;
 flex:1;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 min-width: 0;
 box-sizing: border-box;
`;

const FormContainer = styled.form`
  width: 100%;
  /* margin: 0 10rem; */
  display: flex;
  flex:1;
  flex-direction: column;
  /* box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.5); */
  justify-content: center;
`;

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
    border-bottom: 2px solid rgb(244,185,184);;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1rem;
  margin: 2rem 5rem;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(244,185,184);
  background: linear-gradient(315deg, rgba(244,185,184,1) 0%, rgba(235,187,176,1) 35%, rgba(212,140,112,1) 100%);
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
    const [activeItem, setActiveItem] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    function onSubmit(e) {
        // isLoading(true)
        e.preventDefault();
        if (activeItem === 'signup') {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const user = firebase.auth().currentUser;
                    console.log(user.uid, name, user.email);
                    setUserInfo(user);
                })
                .then(() => {
                    history.push('/homepage');
                    // isLoading(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            alert('信箱格式錯誤');
                            break;
                        case "auth/weak-password":
                            alert('密碼長度至少6碼');
                            break;
                        case "auth/email-already-in-use":
                            alert('信箱已被註冊');
                            break;
                        default:
                    }
                    // isLoading(false);
                })

        } else if (activeItem === 'login') {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    history.push('/homepage');
                    // isLoading(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            alert('信箱格式錯誤');
                            break;
                        case "auth/user-not-found":
                            alert('查無此使用者');
                            break;
                        case "auth/wrong-password":
                            alert('密碼錯誤');
                            break;
                        default:
                    }
                    // isLoading(false);
                })
        }

    }

    const db = firebase.firestore();

    function setUserInfo(user) {
        db.collection("users").doc(user.uid)
            .set({
                uid: user.uid,
                name,
                email: user.email,
                guestlist: "[[]]"
            })
    }

    const loginDiv = () => {
        return (
            <FormContainer>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);

                    }}
                />
                <SubmitButton
                    // type="submit"
                    onClick={(e) => { onSubmit(e) }}
                // loading={isLoading}
                >
                    Login
                </SubmitButton>
                <SwitchButton
                    onClick={() => {
                        setActiveItem('signup');
                        // setErrorMessage('');
                        setName('');
                        setEmail('');
                        setPassword('')
                    }}
                >
                    Swtich to Signup
                </SwitchButton>
            </FormContainer>
        );
    }

    const signupDiv = () => {
        return (
            <FormContainer>
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton
                    // type="submit"
                    onClick={(e) => { onSubmit(e) }}
                // loading={isLoading}
                >
                    Signup
                </SubmitButton>
                <SwitchButton
                    onClick={() => {
                        setActiveItem('login');
                        // setErrorMessage('');
                        setName('');
                        setEmail('');
                        setPassword('')

                    }}
                >
                    Swtich to Login
                </SwitchButton>
            </FormContainer>
        );
    }
    return (
        <Wrapper>
            <Left> <H1>SeTable</H1> </Left>
            <Right>
                {activeItem === 'login' ? loginDiv() : signupDiv()}
            </Right>
        </Wrapper>
    );
}

export default LandingPage;