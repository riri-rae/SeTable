import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getTemplateData } from "./utils/firebaseFunction";
import { useParams } from "react-router";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import RsvpTemplate from "./components/RsvpTemplate";
import RsvpMain from "./components/rsvp/RsvpMain";
import Loading from "./components/Loading";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  @media (max-width: 1320px) {
    flex-wrap: wrap;
    overflow: scroll;
  }
`;

const TemplateWrap = styled.div`
  min-height: 100vh;
  width: calc(100vw - 40vw);
  @media (max-width: 1440px) {
    width: calc(100vw - 36vw);
  }
  @media (max-width: 1320px) {
    min-width: 100vw;
  }
`;

const FormWrap = styled.div`
  min-width: 40vw;
  max-height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  @media (max-width: 1440px) {
    min-width: 36vw;
  }
`;

const InvitationRsvp = () => {
  const history = useHistory();
  const { userid } = useParams();

  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [add, setAdd] = useState("");
  const [pic, setPic] = useState("/images/red_flower.jpeg");

  useEffect(() => {
    getTemplateData(userid, setTemplateDefault)
    function setTemplateDefault(doc) {
      if (!doc.data()) {
        console.log(userid);
        history.replace({ pathname: '404' })
        // console.log("okok");
        setBride("Bride");
        setGroom("Groom");
        setAdd("some where very nice");
        setDateTime("2022-12-31T12:00");
        setPic("/images/red_flower.jpeg")
      }
      else {
        let bride = doc.data().bride;
        let groom = doc.data().groom;
        let dateTime = doc.data().dateTime;
        let add = doc.data().add;
        let pic = doc.data().pic;
        setBride(bride);
        setGroom(groom);
        setDateTime(dateTime);
        setAdd(add);
        setPic(pic);
      }
    }

  }, []);

  return (
    <>
      {bride !== '' && groom !== '' && dateTime !== '' && add !== '' ?
        <>
          <Container>
            <TemplateWrap>
              <RsvpTemplate
                bride={bride}
                groom={groom}
                add={add}
                dateTime={dateTime}
                userid={userid}
                pic={pic}
              />
            </TemplateWrap>
            <FormWrap>
              <RsvpMain userid={userid} />
            </FormWrap>
          </Container>
        </> : <Loading />}
    </>
  );
};

export default InvitationRsvp;
