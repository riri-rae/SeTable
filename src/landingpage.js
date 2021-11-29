import React, { useState } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import { alert } from "./utils/alert";
import { Login, Signup } from "./components/landingpage/Login";
import ScrollButton from "./utils/scrollbutton";

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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
`;

const TopContent = styled.div`
  width: 80%;
  color: #fff;
  letter-spacing: 4px;
  font-family: "Libre Baskerville", serif;
  @media (max-width: 768px) {
    background-color: rgb(0 0 0 / 10%);
    padding: 0 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TopTitleMain = styled.div`
  font-size: 10rem;
  line-height: 12rem;
  @media (max-width: 1440px) {
    font-size: 7.5rem;
    margin-top: 2rem;
  }
  @media (max-width: 768px) {
    font-size: 6rem;
    margin-top: 0rem;
    line-height: 9rem;
    max-width: 100vw;
    overflow: hidden;
  }
  @media (max-width: 425px) {
    font-size: 4.5rem;
    line-height: 8rem;
  }
  @media (max-width: 375px) {
    font-size: 4.2rem;
  }
`;

const TopTitleSub = styled.div`
  font-size: 5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  line-height: 10rem;
  @media (max-width: 1440px) {
    font-size: 4rem;
    margin-top: 0rem;
  }
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const WrapperBottom = styled(WrapperTop)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  margin: 5rem;
  color: #574e56;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 2rem;
  }
  @media (max-width: 375px) {
    max-width: 100vw;
    overflow: hidden;
    margin: 1rem;
  }
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1rem;
  margin: 3rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 375px) {
    margin: 1rem;
  }
`;

const Logo = styled.div`
  background-image: url("/images/logo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 8rem;
  height: 8rem;
  @media (max-width: 1440px) {
    width: 7.5rem;
    height: 7.5rem;
  }
  @media (max-width: 768px) {
    width: 6rem;
    height: 6rem;
    margin: 0 auto;
  }
  @media (max-width: 375px) {
    width: 5rem;
    height: 5rem;
  }
`;

const IntroduceTitle = styled.div`
  white-space: pre-wrap;
  font-size: 3rem;
  margin: 3rem 0;
  @media (max-width: 1440px) {
    font-size: 2.5rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 375px) {
    font-size: 1.8rem;
    text-align: left;
    margin-top: 2rem;
  }
`;

const SeTable = styled.span`
  color: #a47e84;
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const IntroduceText = styled.div`
  font-size: 1.2rem;
  line-height: 2.8rem;
  white-space: pre-wrap;
  display: flex;
  @media (max-width: 1440px) {
    line-height: 2.5rem;
  }
  @media (max-width: 425px) {
    line-height: 2rem;
  }
`;

const SignIn = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  display: flex;
  min-width: 400px;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 30rem;
  margin-top: 14rem;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 20%);
  @media (max-width: 1440px) {
    margin-top: 13.5rem;
  }
  @media (max-width: 1024px) {
    min-width: 355px;
  }
  @media (max-width: 768px) {
    margin-top: 0rem;
    margin-bottom: 2rem;
    height: 26rem;
  }
  @media (max-width: 375px) {
    max-width: 100vw;
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

  const db = firebase.firestore();

  function setUserInfo(user) {
    db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      email: user.email,
      guestlist: "[[]]",
    });
  }


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


  return (
    <Container>
      <WrapperTop>
        <MainBackground>
          <TopContent>
            <TopTitleMain>For</TopTitleMain>
            <TopTitleMain style={{ marginTop: "0" }}>
              Once in a lifetime
            </TopTitleMain>
            <TopTitleSub>- SeTable -</TopTitleSub>
          </TopContent>
          <ScrollButton />
        </MainBackground>
      </WrapperTop>
      <WrapperBottom>
        <Introduce>
          <Logo />
          <IntroduceTitle>
            {`You focus on the big day,\nleave`} <SeTable>SeTable</SeTable>{" "}
            {`to focus on you...`}
          </IntroduceTitle>
          <IntroduceText>
            {`- Edit your custom invitation\n- Get real-time responses from your guests\n- Control your guest list easily\nAnd … the best is … \nArrange guests with easy drag and drop to visualize your wedding tables\nNo worries from table arrangement everlast!`}
          </IntroduceText>
        </Introduce>
        <SignIn>{activeItem === "login" ?
          <Login email={email} setEmail={setEmail} enterKey={enterKey} password={password} setPassword={setPassword} onSubmit={onSubmit} setName={setName} setActiveItem={setActiveItem} />
          : <Signup email={email} setEmail={setEmail} enterKey={enterKey} password={password} setPassword={setPassword} onSubmit={onSubmit} setName={setName} setActiveItem={setActiveItem} name={name} />}</SignIn>
      </WrapperBottom>
    </Container>
  );
};

export default LandingPage;

// style={{ color: "#A47E84" }}
