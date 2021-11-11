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
  /* border: 1px solid #ccc; */
  /* flex: 2; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  /* background-color: #F8EFE9; */
  /* background-color: rgba(0, 0, 0, 0.1); */
`;

const PicTopWrap = styled.div`
  width: 100%;
  /* background-color: rgba(248, 239, 233, 0.8); */
  position: relative;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
`;

const PicTop = styled.div`
background-image: url('/images/red_flower.jpg');
background-position: left;
/* background-attachment: fixed; */
background-repeat: no-repeat;
background-size: cover;
  width: 60vw;
  height: 100vh;
`;

const ContentWrap = styled.div`
  width: 100%;
  position: absolute;
  top:180px;
  /* background-color: rgba(0, 0, 0, 0.1); */
  /* background-color: rgba(248, 239, 233, 0.8); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Stalemate', cursive;
  /* padding-bottom: 100px; */
`;

// const SaveDate = styled.div`
//   font-size: 24px;
//   margin: -76px 16px 24px 16px;
// `;

const BrideName = styled.div`
  font-size: 146px;
  margin: 0 16px 0 16px;
`;
const GroomName = styled(BrideName)``;

const And = styled.div`
  font-size: 72px;
`;
const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px;
  margin-top: 48px;
  font-family: 'Dancing Script', cursive;
  letter-spacing:3px;
  font-size: 36px;
  font-weight: 600;
`;

const Date = styled.div`

  margin-right: 6px;
`;

const Time = styled.div`

  margin-left: 36px;
`;
const Address = styled.div`
  font-size: 36px;
  margin-left: 16px;
  margin-right: 16px;
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  letter-spacing:3px;
`;

const RsvpTemplate = (props) => {
  // const  { id } = useParams();

  let dateAndTime = props.dateTime.split('T')
  let showDate = dateAndTime[0]
  let showTime = `${dateAndTime[1]}pm`
  //console.log(showDate, showTime)

  return (
    <Template>
      <PicTopWrap>
        <PicTop src={Bg} />
        <ContentWrap>
          {/* <SaveDate>Save the Date</SaveDate> */}
          <BrideName>{props.bride}</BrideName>
          <And>&</And>
          <GroomName>{props.groom}</GroomName>
          <DateTimeWrap>
            <Date>{showDate}</Date>
            <Time>{showTime}</Time>
          </DateTimeWrap>
          <Address>{props.add}</Address>
        </ContentWrap>
      </PicTopWrap>
      {/* <PicTopWrap>
        <PicBt src={picbt} />
      </PicTopWrap> */}
    </Template>
  );
};

export default RsvpTemplate;
