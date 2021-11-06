import React, { useState } from "react";
//import { useParams } from "react-router";
import styled from "styled-components";
// import firebase from "../utils/firebase";
// import "firebase/firestore";
import pictop from "../images/purpleFlower-top.png";
import picbt from "../images/purpleFlower-bt.png";

//import { useParams } from "react-router";

const Template = styled.div`
  /* border: 1px solid #ccc; */
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: 100vh; */
  /* background-color: #F8EFE9; */
  /* background-color: rgba(0, 0, 0, 0.1); */
`;

const PicTopWrap = styled.div`
  width: 80%;

  background-color: rgba(248, 239, 233, 0.8);
`;

const PicTop = styled.img`
  max-width: 100%;
`;
const PicBt = styled.img`
  max-width: 100%;
  margin-top: -2rem;
`;
const ContentWrap = styled.div`
  width: 80%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  background-color: rgba(248, 239, 233, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* padding-bottom: 100px; */
`;

const SaveDate = styled.div`
  font-size: 24px;
  margin: -76px 16px 24px 16px;
`;

const BrideName = styled.div`
  font-size: 46px;
  margin: 0 16px 0 16px;
`;
const GroomName = styled(BrideName)``;

const And = styled.div`
  font-size: 36px;
`;
const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px;
  margin-top: 48px;
`;

const Date = styled.div`
  font-size: 24px;
  margin-right: 6px;
`;

const Time = styled.div`
  font-size: 24px;
  margin-left: 6px;
`;
const Address = styled.div`
  font-size: 20px;
  margin-left: 16px;
  margin-right: 16px;
`;

const RsvpTemplate = (props) => {
  // const  { id } = useParams();

  let dateAndTime = props.dateTime.split('T')
  let showDate = dateAndTime[0]
  let showTime = `AT  ${dateAndTime[1]}`
  console.log(showDate, showTime)

  return (
    <Template>
      <PicTopWrap>
        <PicTop src={pictop} />
      </PicTopWrap>
      <ContentWrap>
        <SaveDate>Save the Date</SaveDate>
        <BrideName>{props.bride}</BrideName>
        <And>&</And>
        <GroomName>{props.groom}</GroomName>
        <DateTimeWrap>
          <Date>{showDate}</Date>
          <Time>{showTime}</Time>
        </DateTimeWrap>
        <Address>{props.add}</Address>
      </ContentWrap>
      <PicTopWrap>
        <PicBt src={picbt} />
      </PicTopWrap>
    </Template>
  );
};

export default RsvpTemplate;
