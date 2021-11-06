import React, { useState, useEffect } from "react";
//import Select from 'react-select'
import { useParams } from "react-router";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import RsvpTemplate from "./components/RsvpTemplate";
import RsvpMain from "./components/RsvpMain";

//import { useParams } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  max-height: 100vh;
  margin: 0 auto;
  /* flex-direction: column; */
`;

const InvitationRsvp = () => {
  const { userid } = useParams();
  const db = firebase.firestore();

  const [bride, setBride] = useState('');
  const [groom, setGroom] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [add, setAdd] = useState('');

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

  return (
    <Container>
      <RsvpTemplate bride={bride} groom={groom} add={add} dateTime={dateTime} userid={userid} />
      <RsvpMain userid={userid} />
    </Container>
  );
};

export default InvitationRsvp;
