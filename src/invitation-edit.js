import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "firebase/firestore";
import Header from "./components/Header";
import RsvpTemplate from "./components/RsvpTemplate";
import { Button } from "./components/style/generalStyle";
import Swal from "sweetalert2";
import Loading from "./components/Loading";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { saveEditTemplate, snapshotEditDefault } from "./utils/firebaseFunction";

import "firebase/firestore";

const Container = styled.div`
  background-color: #fcf6ef;
  font-family: "Karla", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-height: calc(100vh - 80px);
  overflow: hidden;
  @media (max-width: 1320px) {
    flex-wrap: wrap;
    overflow: scroll;
  }
  /* @media (max-width: 1320px) {
    flex-direction: column;
    flex-wrap: wrap;
    overflow: scroll;
  } */

`;

const TemplateWrap = styled.div`
  height: 100vh;
  width: calc(100vw - 40vw);

  @media (max-width: 1440px) {
    width: calc(100vw - 36vw);
  }
  @media (max-width: 1320px) {
    min-width: 100vw;
  }

`;


const Edit = styled.div`
  color: #5b5151;
  box-sizing: border-box;
  font-size: 24px;
  min-width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 16px;
  padding: 20px;
  @media (max-width: 1440px) {
    min-width: 36vw;
  }
`;

const Frame = styled.div`
  background-image: url("/images/hr-light.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 36px;
`;


const EditTitle = styled.div`
  font-size: 36px;
  margin-bottom: 30px;

  @media (max-width: 1440px) {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

const EditText = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 4px;
`;

const InputWrap = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 20px;
  margin: 16px;
  @media (max-width: 1440px) {
    margin: 8px;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  font-family: "Karla", sans-serif;
  width: 256px;
  padding: 4px;
`;

const Select = styled.select`
  box-shadow: none;
  border: 2px solid #ddd;
  border-radius: 5px;
  background: #fff;
  background-image: none;
  flex: 1;
  padding: 4px;
  cursor: pointer;
  height: 32px;
  width: 256px;
  text-align: left;
  line-height: 22px;
  font-size: 18px;
  font-family: "Karla", sans-serif;
  width: 269px;
  padding: 4px;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 64px;
  line-height: 24px;
  font-family: "Karla", sans-serif;
  font-size: 18px;
  width: 256px;
  border: 2px solid #ddd;
  border-radius: 5px;
  color: #44342d;
  outline: none;
  padding: 4px;
`;

const CheckRsvp = styled.div`
  color: #574e56;
  &:hover {
    text-decoration: none;
    color: #d48c70;
  }
`;

const CheckWrap = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 36px;
  font-family: "Karla", sans-serif;
  color: #574e56;
  &:hover {
    color: #d48c70;
  }
  &:hover ${CheckRsvp} {
    text-decoration: none;
    color: #d48c70;
  }
  &:active ${CheckRsvp} {
    outline: none;
  }
  @media (max-width: 1440px) {
    margin-top: 20px;
  }
`;

const ArrowIcon = styled(HiOutlineArrowCircleRight)`
  font-size: 30px;
  margin-left: 4px;
`;

const InvitationEdit = () => {

  const user = useSelector((state) => state.user);
  const [pic, setPic] = useState("");
  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [add, setAdd] = useState("");

  useEffect(() => {
    function getDefault(doc) {
      if (!doc.data()) {
        setBride("Bride");
        setGroom("Groom");
        setAdd("some where very nice");
        setDateTime("2022-12-31T12:00");
        setPic("/images/red_flower.jpeg");
      } else if (
        doc.data().dateTime &&
        !doc.data().bride &&
        !doc.data().groom &&
        !doc.data().add &&
        !doc.data().pic
      ) {
        setBride("Bride");
        setGroom("Groom");
        setAdd("some where very nice");
        setPic("/images/red_flower.jpeg");
        let dateTime = doc.data().dateTime;
        setDateTime(dateTime);
      } else {
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
    snapshotEditDefault(user.uid, getDefault);
  }, []);

  function saveChange(uid, bride, groom, dateTime, add, pic) {
    if (!bride || !groom || !dateTime || !add) {
      Swal.fire("", "Can't save with an emty column ", "warning");
    } else {
      saveEditTemplate(uid, bride, groom, dateTime, add, pic)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }

  return (
    <>
      <Header />
      {pic ? (
        <>
          <Container>
            <TemplateWrap>
              <RsvpTemplate
                bride={bride}
                groom={groom}
                add={add}
                dateTime={dateTime}
                pic={pic}
              />
            </TemplateWrap>

            <Edit>
              <Frame />
              <EditTitle>Edit Your Custom Information</EditTitle>
              <EditText>
                <InputWrap>
                  <Label>Theme:</Label>
                  <Select value={pic} onChange={(e) => setPic(e.target.value)}>
                    <option value="/images/red_flower.jpeg">TheOne</option>
                    <option value="/images/orange.jpeg">Passionate</option>
                    <option value="/images/yellowbg.jpeg">SunShine</option>
                  </Select>
                </InputWrap>
                <InputWrap>
                  <Label htmlFor="bride-name">Name one:</Label>
                  <Input
                    type="text"
                    id="bride-name"
                    placeholder="Enter the name"
                    value={bride}
                    onChange={(e) => setBride(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <Label htmlFor="groom-name">Name two:</Label>
                  <Input
                    type="text"
                    id="groom-name"
                    placeholder="Enter the name"
                    value={groom}
                    onChange={(e) => setGroom(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <Label htmlFor="date">Pick the date:</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    lang="en-US"
                    name="date"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <Label htmlFor="add">Address:</Label>
                  <Textarea
                    placeholder="Enter the addrsss"
                    value={add}
                    onChange={(e) => setAdd(e.target.value)}
                  ></Textarea>
                </InputWrap>
              </EditText>
              <Button onClick={() => { saveChange(user.uid, bride, groom, dateTime, add, pic) }}>Save</Button>

              <CheckWrap>
                <CheckRsvp
                  onClick={() => {
                    window.open(`/invitation-rsvp/${user.uid}`);
                  }}
                >
                  Check your Rsvp Here
                </CheckRsvp>
                <ArrowIcon />
              </CheckWrap>
              <Frame />
            </Edit>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default InvitationEdit;
