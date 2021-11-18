import React, { useState, useEffect } from "react";
//import Select from 'react-select'
import { useParams } from "react-router";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import RsvpTemplate from "./components/RsvpTemplate";
import RsvpMain from "./components/RsvpMain";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1920px;
  max-height: 100%;
  margin: 0 auto;
  /* flex-direction: column; */
  position: relative;
`;

const TemplateWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  flex: 2;
  /* width: 60%; */
  width: 1152px;
`;

const FormWrap = styled.div`
  position: absolute;
  right: 0;
  top: 7rem;
  width: calc(100vw - 1152px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* @media (max-width: 1440px) {
    width: 400px;
  } */
`;

const InvitationRsvp = () => {
  const { userid } = useParams();

  const db = firebase.firestore();

  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [add, setAdd] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(userid)
      .collection("invitation")
      .doc("template")
      .onSnapshot((doc) => {
        let bride = doc.data().bride;
        let groom = doc.data().groom;
        let dateTime = doc.data().dateTime;
        let add = doc.data().add;
        setBride(bride);
        setGroom(groom);
        setDateTime(dateTime);
        setAdd(add);
      });
  }, []);

  return (
    <Container>
      <TemplateWrap>
        <RsvpTemplate
          bride={bride}
          groom={groom}
          add={add}
          dateTime={dateTime}
          userid={userid}
        />
      </TemplateWrap>
      <FormWrap>
        <RsvpMain userid={userid} />
      </FormWrap>
    </Container>
  );
};

export default InvitationRsvp;
