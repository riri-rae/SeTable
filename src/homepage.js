import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { getUserData, saveHomepageDate, getTemplateData } from "./utils/firebaseFunction";

import firebase from "./utils/firebase";
import "firebase/firestore";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  height: calc(100vh - 80px);
  text-align: center;
  overflow: hidden;
  color: #574e56;
  overflow: hidden;
`;

const CenterBg = styled.div`
  background-image: url("/images/homepage-full.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const CenterWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  text-align: center;
`;

const ContentWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TopWrap = styled.div`
  font-size: 28px;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 36px;
  letter-spacing: 4px;
`;

const TextLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* font-family: 'Dancing Script'; */
  font-family: "Libre Baskerville", serif;
`;

const InputLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

const Button = styled.button`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  height: 34px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  height: 16px;
  width: 260px;
  font-size: 16px;
  vertical-align: middle;
  outline: none;
  border-radius: 16px;
  padding: 8px;
  color: #44342d;
  background-color: #fff;
`;

const CountDown = styled.div`
  font-size: 16px;
  border-radius: 5px;
  margin-top: 36px;
  top: 0;
  color: #44342d;
  font-size: 24px;
  display: flex;
  justify-content: center;
  padding: 16px 24px;
`;

const BgWrap = styled.div`
  width: 120px;
  height: 120px;
  margin: 30px;
  border-radius: 5px;
  background-color: rgb(246, 235, 229);
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
`;

const Time = styled.div`
  font-size: 42px;
  padding: 8px;
  font-family: "Dancing Script";
`;

const Content = styled.div`
  font-size: 20px;
`;

const HomePage = () => {
  const db = firebase.firestore();
  const user = useSelector((state) => state.user);

  const [userName, setUserName] = useState(null);
  const [enterDate, setEnterDate] = useState("");
  const [getDate, setGetDate] = useState("");

  const [dd, setDd] = useState();
  const [hr, setHr] = useState();
  const [mm, setMm] = useState();
  const [ss, setSs] = useState();

  useEffect(() => {
    getUserData(user.uid, getUserName)
    function getUserName(doc) {
      setUserName(doc.data().name);
    }
  }, []);

  function saveDateChange() {
    saveHomepageDate(user.uid, enterDate).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  useEffect(() => {
    getTemplateData(user.uid, getDate)
    function getDate(doc) {
      if (!doc.data()) {
        setGetDate("");
      } else {
        setGetDate(doc.data().dateTime);
        setEnterDate(doc.data().dateTime);
      }
    }
  }, []);

  useEffect(() => {
    if (!getDate) {
      setDd("0");
      setHr("0");
      setMm("0");
      setSs("0");
    } else {
      const countDownDate = new Date(getDate).getTime();

      const x = setInterval(function () {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDd(days);
        setHr(hours);
        setMm(minutes);
        setSs(seconds);

        if (distance < 0) {
          clearInterval(x);
          setDd("0");
          setHr("0");
          setMm("0");
          setSs("0");
        }
      }, 1000);

      return () => {
        clearInterval(x);
      };
    }
  }, [getDate]);

  return (
    <>
      <Header />
      {/* {userName && enterDate !== '' && getDate !== '' && dd && hr && mm & ss ? */}
      {userName ? (
        <>
          <Container>
            <CenterBg>
              <CenterWrap>
                <ContentWrap>
                  <TopWrap>
                    <TextLine>
                      <div>
                        Welcome to{" "}
                        <span style={{ color: "#A47E84" }}>SeTable</span>{" "}
                        {userName} ,{" "}
                      </div>
                      <div>Let's set your event time!</div>
                    </TextLine>
                    <InputLine>
                      <Input
                        id="date"
                        type="datetime-local"
                        lang="en-US"
                        name="date"
                        value={enterDate}
                        onChange={(e) => setEnterDate(e.target.value)}
                      />
                      <Button onClick={saveDateChange}>Save</Button>
                    </InputLine>
                  </TopWrap>
                  <CountDown>
                    <BgWrap>
                      <Time>{dd}</Time>
                      <Content>Days</Content>
                    </BgWrap>
                    <BgWrap>
                      <Time>{hr}</Time>
                      <Content>Hrs</Content>
                    </BgWrap>
                    <BgWrap>
                      <Time>{mm}</Time>
                      <Content>Mins</Content>
                    </BgWrap>
                    <BgWrap>
                      <Time>{ss}</Time>
                      <Content>Sec</Content>
                    </BgWrap>
                  </CountDown>
                </ContentWrap>
              </CenterWrap>
            </CenterBg>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomePage;
