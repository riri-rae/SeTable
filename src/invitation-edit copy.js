import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import pictop from "../src/images/purpleFlower-top.png";
import picbt from "../src/images/purpleFlower-bt.png";
//import picbt from "../src/images/rose-ring.png";


import "firebase/firestore";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  max-height:100vh;
  margin: 0 auto;
  /* flex-direction: column; */
`;

const Template = styled.div`
  /* border: 1px solid #ccc; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: 100vh; */
  background-color: rgba(239, 239, 222, 0.3);
`;

const PicTopWrap = styled.div`
  width: 80%;
  background-color: rgba(239, 239, 222, 0.2);
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
  background-color: rgba(239, 239, 222, 0.2);
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
`
const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin:16px;
  margin-top:48px;
`;

const Date = styled.div`
  font-size: 24px;
  margin-right: 6px;
`;

const Time = styled.div`
  font-size: 24px;
  margin-left:6px;
`;
const Address = styled.div`
  font-size: 20px;
  margin-left:16px;
  margin-right:16px;
`;

const Edit = styled.div`
  font-size: 24px;
  border: 1px solid #ccc;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditTitle = styled.div`
  font-size: 24px;
  margin-bottom: 60px;
`;

const EditText = styled.div`
  font-size: 24px;
  flex-direction:row;
`;

const Input = styled.input`
  border-radius: 5px;
  border:2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  margin-left: 8px;

`;

const InputWrap = styled.div`
display:flex;
line-height: 20px;
margin: 16px;
`;


const Label = styled.label`
 width:200px;
 text-align:right; 
`;

const Button = styled.button`
  /* display: flex;
  align-items: center; */
  /* margin: 16px; */
  margin-left:4px;
  /* padding: 0.5rem; */
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;



const InvitationEdit = () => {
  return (
    <Container>
      <Template>
        <PicTopWrap>
          <PicTop src={pictop} />
        </PicTopWrap>
        <ContentWrap>
          <SaveDate>Save the Date</SaveDate>
          <BrideName>Ariana</BrideName>
          <And>&</And>
          <GroomName>Thomas</GroomName>
          <DateTimeWrap>
            <Date>2022.05.20</Date>
            <Time>At 12:00 PM</Time>
          </DateTimeWrap>
          <Address>1 N Kaniku Dr, Waimea, HI 96743, USA</Address>
        </ContentWrap>
        <PicTopWrap>
          <PicBt src={picbt} />
        </PicTopWrap>

      </Template>

      <Edit>
        <EditTitle>Edit your custom infomation</EditTitle>

        <EditText>
          <InputWrap>
            <Label htmlFor="bride-name">Bride's Name:</Label>
            <Input type="text" id="bride-name" />
            <Button>Edit</Button>
          </InputWrap>
        </EditText>
        <EditText>
          <InputWrap>
            <Label htmlFor="groom-name">Groom's Name:</Label>
            <Input type="text" id="groom-name" />
            <Button>Edit</Button>
          </InputWrap>
        </EditText>
        <EditText>
          <InputWrap>
            <Label htmlFor="wedding-date">Wedding Date:</Label>
            <Input type="text" id="wedding-date" />
            <Button>Edit</Button>
          </InputWrap>
        </EditText>
        <EditText>
          <InputWrap>
            <Label htmlFor="wedding-time">Time:</Label>
            <Input type="text" id="wedding-time" />
            <Button>Edit</Button>
          </InputWrap>
        </EditText>
        <EditText>
          <InputWrap>
            <Label htmlFor="Address">Address:</Label>
            <Input type="text" id="Address" />
            <Button>Edit</Button>
          </InputWrap>
        </EditText>
      </Edit>
    </Container>
  );
};

export default InvitationEdit;
