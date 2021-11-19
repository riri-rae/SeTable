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
  width: 100vw;
  height: 100vh;
`;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   max-width: 1920px;
//   max-height: 100%;
//   margin: 0 auto;
//   position: relative;
// `;

const TemplateWrap = styled.div`
  min-height: 100vh;
  width: calc(100vw - 40vw);
  @media (max-width: 1440px) {
    width: calc(100vw - 36vw);
  }
`;

// const TemplateWrap = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   flex: 2;
//   width: 1152px;
// `;

const FormWrap = styled.div`
  min-width: 40vw;
  max-height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  /* padding: 0 36px; */
  @media (max-width: 1440px) {
    min-width: 36vw;
  }
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
