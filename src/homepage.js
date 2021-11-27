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
  background-image: url("/images/loginbg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 80px);
  min-width: 100vw;
  /* text-align: center; */
  color: #574e56;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: calc(100vh - 100px);
  }
`;

// const CenterBg = styled.div`
//   background-image: url("/images/homepage-full.jpeg");
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   width: 100%;
//   height: 100%;
// `;

// const CenterWrap = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: relative;
//   box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   max-height: 100vh;
//   text-align: center;
// `;

const ContentWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: calc(100vh - 80px);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.4);
`;

const TopWrap = styled.div`
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: 4px;

  @media (max-width: 1440px) {
    font-size: 2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 425px) {
    font-size: 0.9rem;
    margin-top: 36px;
  }
`;

const TextLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Libre Baskerville", serif;
`;

const InputLine = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;

  @media (max-width: 375px) {
    flex-wrap: wrap;
    margin-top: 24px;
  }
  
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
  @media (max-width: 375px) {
    min-width: 96%;
  }
`;

const Button = styled.button`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  height: 34px;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 375px) {
    margin:12px 0 0 0;
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
  @media (max-width: 425px) {
    flex-wrap: wrap;
  }
  @media (max-width: 375px) {
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
    width: 100px;
    height: 100px;
    margin: 24px;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
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
  @media (max-width: 600px) {
    font-size: 28px;
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
  }, []);

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
            {/* <CenterBg> */}
            {/* <CenterWrap> */}
            <ContentWrap>
              <TopWrap>
                <TextLine>
                  <div>
                    Welcome to <span style={{ color: "#A47E84" }}>SeTable</span>{" "}
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
            {/* </CenterWrap> */}
            {/* </CenterBg> */}
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomePage;
