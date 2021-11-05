import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import pictop from "../src/images/purpleFlower-top.png";
import picbt from "../src/images/purpleFlower-bt.png";
import Header from "./components/Header";
import RsvpTemplate from "./components/RsvpTemplate";
//import picbt from "../src/images/rose-ring.png";

import "firebase/firestore";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  max-height: 100vh;
  margin: 0 auto;
  /* flex-direction: column; */
`;

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
  font-size: 20px;
  flex-direction: row;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  margin-left: 8px;
`;

const InputWrap = styled.div`
  display: flex;
  line-height: 20px;
  margin: 16px;
`;

const Label = styled.label`
  width: 200px;
  text-align: right;
`;

const Button = styled.button`
  /* display: flex;
  align-items: center; */
  /* margin: 16px; */
  margin-left: 4px;
  /* padding: 0.5rem; */
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const InvitationEdit = () => {

  const [bride, setBride] = useState('');
  const [groom, setGroom] = useState('');
  const [date, setDate] = useState('');
  // const [time, setTime] = useState('');
  const [add, setAdd] = useState('');


  // const db = firebase.firestore();


  return (
    <>
      <Header />
      <Container>
        <RsvpTemplate bride={bride} groom={groom} add={add} date={date} />
        <Edit>
          <EditTitle>Edit your custom infomation</EditTitle>

          <EditText>
            <InputWrap>
              <Label htmlFor="bride-name">Bride's Name:</Label>
              <Input
                type="text"
                id="bride-name"
                placeholder="Enter the name"
                value={bride}
                onChange={(e) => setBride(e.target.value)}
              />
              <Button>Edit</Button>
              <Button>Save</Button>
            </InputWrap>
          </EditText>
          <EditText>
            <InputWrap>
              <Label htmlFor="groom-name">Groom's Name:</Label>
              <Input
                type="text"
                id="groom-name"
                placeholder="Enter the name"
                value={groom}
                onChange={(e) => setGroom(e.target.value)}
              />
              <Button>Edit</Button>
              <Button>Save</Button>
            </InputWrap>
          </EditText>
          <EditText>
            <InputWrap>
              {/* <Label htmlFor="wedding-date">Wedding Date:</Label>
              <Input type="text" id="wedding-date" /> */}
              <label for="date">Enter the date:</label>
              <input id="date" type="datetime-local" lang="en-US" name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              {/* 
              <Button>Edit</Button>
              <Button>Save</Button> */}
            </InputWrap>
          </EditText>
          {/* <EditText>
            <InputWrap>
              <Label htmlFor="wedding-time">Time:</Label>
              <Input type="text" id="wedding-time" />
              <label for="time">Enter the time:</label>
              <input id="time" type="time" lang="en-US" name="time" />
            </InputWrap>
          </EditText> */}
          <EditText>
            <InputWrap>
              <Label htmlFor="add">Address:</Label>
              <Input
                type="text"
                id="add"
                placeholder="Enter the addrsss"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
              <Button>Edit</Button>
              <Button>Save</Button>
            </InputWrap>
          </EditText>
          <Button>Send</Button>
        </Edit>
      </Container>
    </>
  );
};

export default InvitationEdit;
