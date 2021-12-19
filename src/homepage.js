import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import Loading from "./components/Loading";
import {
  getUserData,
  saveHomepageDate,
  getTemplateData,
} from "./utils/firebaseFunction";
import { alertWithTimer } from "./utils/alert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 80px);
  max-width: 100vw;
  color: #574e56;
  overflow: hidden;
  position: relative;

  &:before {
    content: "";
    background-image: url("/images/homepagetree.jpeg");
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
  }

  @media (max-width: 768px) {
    height: calc(100vh - 100px);
  }
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  margin: 0 auto;
  &:before {
  content: "";
    opacity: 0.6;
    background-color: white;
    position: absolute;
    transform: translateX(-50%);
    top: -90%;
    left: 50%;
    bottom: -90%;
    width: 80%;
    z-index: -1;
    @media (max-width: 767px) {
    width: 100%;
  }
  }
`;

const TopWrap = styled.div`
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: 4px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  @media (max-width: 425px) {
    font-size: 2rem;
  }
`;

const TextLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Libre Baskerville", serif;
  @media (max-width: 425px) {
    font-size: 2rem;
  }
`;

const Greeting = styled.div`
  text-align: center;
  padding: 0 16px;
  @media (max-width: 425px) {
    padding: 0 18px;
  }
`;

const InputLine = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;

  @media (max-width: 390px) {
    flex-wrap: wrap;
    margin-top: 24px;
  }
`;

const Input = styled.input`
  border: 1px solid #ddd;
  height: 20px;
  width: 20rem;
  font-size: 16px;
  vertical-align: middle;
  outline: none;
  border-radius: 16px;
  padding: 8px;
  color: #44342d;
  background-color: #fff;
  @media (max-width: 425px) {
    min-width: 16rem;
  }
  @media (max-width: 390px) {
    margin: 0 36px;
  }
`;

const Button = styled.button`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 8px;
  height: 36px;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 390px) {
    margin: 12px 0 0 0;
  }
`;

const CountDown = styled.div`
  border-radius: 5px;
  margin-top: 36px;
  padding: 16px 24px;
  color: #44342d;
  font-size: 24px;
  display: flex;
  justify-content: center;
  text-align: center;

  @media (max-width: 1024px) {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  @media (max-width: 390px) {
    padding: 0;
  }
`;

const DateWrap = styled.div`
  width: 120px;
  height: 120px;
  margin: 30px;
  border-radius: 5px;
  background-color: rgb(246, 235, 229);
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 30%;
    height: 100px;
    margin: 14px;
  }
  @media (max-width: 425px) {
    margin: 12px;
  }
`;

const Time = styled.div`
  font-size: 42px;
  padding: 8px;
  font-family: "Dancing Script";

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Content = styled.div`
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const HomePage = () => {
  const user = useSelector((state) => state.user);

  const [userName, setUserName] = useState(null);
  const [enterDate, setEnterDate] = useState("");
  const [getDate, setGetDate] = useState("");

  const [dd, setDd] = useState();
  const [hr, setHr] = useState();
  const [mm, setMm] = useState();
  const [ss, setSs] = useState();

  useEffect(() => {
    getUserData(user.uid, getUserName);
    function getUserName(doc) {
      setUserName(doc.data().name);
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function saveDateChange() {
    saveHomepageDate(user.uid, enterDate).then(() => {
      alertWithTimer("Success!", "Your work has been saved", "success");
    });
  }

  useEffect(() => {
    getTemplateData(user.uid, getDate);
    function getDate(doc) {
      if (!doc.data()) {
        setGetDate("");
      } else {
        setGetDate(doc.data().dateTime);
        setEnterDate(doc.data().dateTime);
      }
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
      {userName ? (
        <>
          <Container>
            <ContentWrap>
              <TopWrap>
                <TextLine>
                  <Greeting>
                    Dear <span style={{ color: "#A47E84" }}>{userName}</span>
                  </Greeting>
                  <Greeting>Let's set your event time!</Greeting>
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
                <DateWrap>
                  <Time>{dd}</Time>
                  <Content>Days</Content>
                </DateWrap>
                <DateWrap>
                  <Time>{hr}</Time>
                  <Content>Hrs</Content>
                </DateWrap>
                <DateWrap>
                  <Time>{mm}</Time>
                  <Content>Mins</Content>
                </DateWrap>
                <DateWrap>
                  <Time>{ss}</Time>
                  <Content>Sec</Content>
                </DateWrap>
              </CountDown>
            </ContentWrap>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomePage;
