import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { alert } from "../../utils/alert";
import { updateHistory, getHistory } from "../../utils/firebaseFunction";
import { Button } from "../../components/style/generalStyle";
import "firebase/firestore";
import "firebase/auth";
import { useSelector } from "react-redux";

const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 4px;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  max-width: 6rem;
`;

const InputNew = styled(Input)`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 24px;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  max-width: 100%;
  text-align: left;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    margin:8px;
  } ;

  @media (max-width: 375px) {
    margin:6px 4px;
  } ;
`;

const MainTitleContainer = styled.div`
  margin: 0 auto;
  padding: 20px 20px 0 20px;
  /* width: 80%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #a49393;
  @media (max-width: 768px) {
    padding: 8px 8px 0 8px;
  } ;
`;

const Title = styled.div`
  font-size: 24px;
  color: #574e56;
  margin-left: 16px;
  color: #fff;

  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 0;
      width: 200px;
  } ;
`;
const Count = styled(Title)`
  width: 32px;
  align-items: center;
  @media (max-width: 768px) {
    margin-left: 8px;
  } ;
`;

const Hr = styled.hr`
  width: 100%;
  margin-top: 8px;
  background-color: #ccc;
  height: 2px;
  border-style: none;
  @media (max-width: 768px) {
    margin-top: 2px;
  } ;
`;

const DropBtn = styled.button`
  margin-left: 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 7px 1px rgba(114, 114, 114, 0.8);
  position: relative;
  &:active {
    top: 2px;
  }
  @media (max-width: 375px) {
    margin-left: 8px;
  } ;
`;

const ButtonStyled = styled(Button)`
   font-size: 16px;
   @media (max-width: 768px) {
    font-size: 14px;
  } ;
  @media (max-width: 375px) {
    margin: 4px;
    padding:0.4rem
  } ;
`;

const DropIcon = styled.p`
  color: #9b5b5b;
  transform: ${(props) => (props.display ? "rotate(0deg)" : "rotate(180deg)")};
  transition: all 0.3s ease-in-out;
  
`;

function GuestlistMain({
  title,
  count,
  addValue,
  setName,
  status,
  click,
  display,
}) {
  const db = firebase.firestore();
  const user = useSelector((state) => state.user);

  function onSubmit(body, id) {
    const rsvp = db
      .collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .doc(id);
    rsvp.set(body);
  }

  function changeHistoryTable(id, addYes) {
    getHistory(user.uid, handelUpdateHistory);
    function handelUpdateHistory(doc) {
      const historyList = JSON.parse(doc.data().guestlist);
      const newList = [
        [{ id: `${id}`, content: `${addYes}` }, ...historyList[0]],
        ...historyList.slice(1),
      ];
      updateHistory(user.uid, newList);
    }
  }

  return (
    <MainTitleContainer>
      <Title>{title}</Title>
      <Count>{count}</Count>
      <InputNew
        type="text"
        id="name"
        placeholder="Enter a guest name"
        value={addValue}
        onChange={(e) => setName(e.target.value)}
      />
      <ButtonStyled
        onClick={() => {
          if (!addValue) {
            alert("Empty columns!", "Please enter a name", "warning");
            return;
          } else {
            const id = db.collection("users").doc().id;
            let body = {
              name: addValue,
              status: status,
              group: "",
              tag: "",
              role: "",
              baby: "",
              veggie: "",
              note: "",
              time: firebase.firestore.Timestamp.now(),
              id,
            };
            onSubmit(body, id);
            setName("");
            if (title === "Joyfully Attend") {
              changeHistoryTable(id, addValue);
            }
          }
        }}
      >
        Add
      </ButtonStyled>
      <DropBtn onClick={click}>
        <DropIcon display={display}>▼</DropIcon>
      </DropBtn>
      <Hr />
    </MainTitleContainer>
  );
}

export default GuestlistMain;
