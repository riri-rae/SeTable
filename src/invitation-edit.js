import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
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

  const [bride, setBride] = useState('Bride');
  const [groom, setGroom] = useState('Ｇroom');
  const [dateTime, setDateTime] = useState('2022-01-01T12:00');
  const [add, setAdd] = useState('Some Here very nice');

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("invitation").doc("template")
      .onSnapshot((doc) => {
        let bride = doc.data().bride
        let groom = doc.data().groom
        let dateTime = doc.data().dateTime
        let add = doc.data().add
        setBride(bride)
        setGroom(groom)
        setDateTime(dateTime)
        setAdd(add)
      });
  }, []);

  function saveChange() {
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("invitation").doc("template")
      .update({
        bride,
        groom,
        dateTime,
        add
      })
      .then(() => {
        window.alert("Change Saved!");
      })
  }


  return (
    <>
      <Header />
      <Container>
        <RsvpTemplate bride={bride} groom={groom} add={add} dateTime={dateTime} />
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
              {/* <Button>Edit</Button> */}
              {/* <Button
                onClick={saveChange}
              >
                Save
              </Button> */}
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
              {/* <Button>Edit</Button> */}
              {/* <Button
                onClick={saveChange}
              >
                Save
              </Button> */}
            </InputWrap>
          </EditText>
          <EditText>
            <InputWrap>
              {/* <Label htmlFor="wedding-date">Wedding Date:</Label>
              <Input type="text" id="wedding-date" /> */}
              <label for="date">Enter the date:</label>
              <input id="date" type="datetime-local" lang="en-US" name="date"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />


              {/* <Button>Edit</Button> */}
              {/* <Button
                onClick={saveChange}
              >
                Save
              </Button> */}
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
              {/* <Button>Edit</Button> */}
              {/* <Button
                onClick={saveChange}
              >
                Save
              </Button> */}
            </InputWrap>
          </EditText>
          <Button
            onClick={saveChange}
          >
            Save Change
          </Button>
          <Button>Check your Rsvp Here</Button>
        </Edit>
      </Container>
    </>
  );
};

export default InvitationEdit;
