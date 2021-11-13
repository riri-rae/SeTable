import React, { useState } from "react";
//import { useParams } from "react-router";
import styled from "styled-components";
// import firebase from "../utils/firebase";
// import "firebase/firestore";
import Bg from "../images/invitation.jpeg";
// rose-ring.png
// frame.jpeg

//import { useParams } from "react-router";

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 0px 0px 10px 6px rgba(138, 105, 90, 0.7);
`;

const PicWrap = styled.div`
  width: 100%;
  height:100%;
  position: relative;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);

`;

const BackGround = styled.div`
  background-image: url("/images/red_flower.jpg");
  background-position: left;
  /* background-attachment: fixed; */
  background-repeat: no-repeat;
  background-size: cover;
  width: 60vw;
  height: 100vh;
`;

const ContentWrap = styled.div`
  width: 50%;
  position: absolute;
  top:  7rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 10px 5px rgba(183, 143, 149, 0.3);
  /* box-shadow: 2px 2px 30px 5px #b78f95; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Stalemate", cursive;
  max-height: 100vh;
  text-align: center;
  padding: 36px 8px;
  overflow: hidden;
`;

const Name = styled.div`
  font-size: 126px;
  margin: -8px 16px;
  height: 180px;
`;

const And = styled.div`
  font-size: 72px;
  margin-top: -30px;
`;

const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px;
  margin-top: 28px;
  font-family: "Dancing Script", cursive;
  letter-spacing: 3px;
  font-size:24px;
  padding-bottom: 28px;
;
`;

const Side = styled.div`
    font-family: "Dancing Script", cursive;
    padding: 16px 0;
    border-top: 2px solid rgba(23, 43, 77, 0.5);
    border-bottom: 2px solid rgba(23, 43, 77, 0.5);
    width: 180px;
`;


const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5vw;

`;

const Month = styled.div`
   font-family: "Dancing Script", cursive;
`;

const Date = styled.div`
   font-family: "Dancing Script", cursive;
   font-size: 28px;
`;

const Year = styled.div`
 font-size: 20px;
`;

const Address = styled.div`
  font-size: 24px;
  font-family: "Dancing Script";
  letter-spacing: 3px;
`;

const RsvpTemplate = (props) => {
  // const  { id } = useParams();

  const dateAndTime = props.dateTime.split("T");
  const date = new window.Date(dateAndTime);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: "short" })
  const mm = month.toUpperCase();
  const dd = date.getDate();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const getwd = date.toLocaleString('en-US', { weekday: "long" })
  const wd = getwd.toUpperCase();

  console.log(year, month, dd, time, wd)


  return (
    <Template>
      <PicWrap>
        <BackGround src={Bg} />
        <ContentWrap>
          {/* <SaveDate>Save the Date</SaveDate> */}
          <Name>{props.bride}</Name>
          <And>&</And>
          <Name>{props.groom}</Name>
          <DateTimeWrap>
            <Side>{wd}</Side>
            <DateWrap>
              <Month>{mm}</Month>
              <Date>{dd}</Date>
              <Year>{year}</Year>
            </DateWrap>
            <Side>{time}</Side>
          </DateTimeWrap>
          <Address>{props.add}</Address>
        </ContentWrap>
      </PicWrap>
      {/* <PicWrap>
        <PicBt src={picbt} />
      </PicWrap> */}
    </Template>
  );
};

export default RsvpTemplate;
