import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import updateHistory from "../../utils/updateHistory";
import "firebase/firestore";
import 'firebase/auth';
import Swal from "sweetalert2";



const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 4px;
  /* margin-left:24px; */
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
`;



const Title = styled.div`
  font-size: 24px;
  color: #574e56;
  margin-left: 16px;
  color:#fff;
  width: 205px;
  text-align:center;
`;
const Count = styled(Title)`
  width: 32px;
  height: 32px;
  align-items: center;
`;



const Hr = styled.hr`
  width: 100%;
  margin-top: 8px;
  background-color: #ccc;
  height: 2px;
  border-style: none;
`;



const Button = styled.button`
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 4px;
  padding: 0.4rem 0.8rem;
  color: #574e56;
  border: 1px solid #ddd;
  /* background: #fff; */
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    transition-duration: 0.2s;
    background-color: #d48c70;
    color: #fff;
  }
  &:after {
    content: "";
    display: white;
    position: absolute;
    border-radius: 16px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.4s;
    box-shadow: 0 0 5px 10px rgba(117, 99, 66, 0.5);
  }

  &:active:after {
    box-shadow: 0 0 0 0 rgba(117, 99, 66, 0.9);
    position: absolute;
    border-radius: 16px;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }

  &:active {
    top: 1px;
  }
`;
const DropBtn = styled.button`
  margin-left: 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 7px 1px rgba(114, 114, 114,0.8);
  position: relative;
  &:active {
    top: 2px;
  }

`;

const DropIcon = styled.p`
color: #9B5B5B;
transform: ${(props) => (props.display ? "rotate(0deg)" : 'rotate(180deg)')};
transition: all 0.3s ease-in-out;
`;

function GuestlistMain({
  title,
  count,
  addValue,
  setName,
  status,
  click,
  display
}) {

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  function onSubmit(body, id) {
    const rsvp = db
      .collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .doc(id);
    rsvp.set(body);
  }

  function changeHistoryTable(id, addYes) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const history = doc.data().guestlist;
        const historyList = JSON.parse(history);
        const newList = [
          [{ id: `${id}`, content: `${addYes}` }, ...historyList[0]],
          ...historyList.slice(1),
        ];
        updateHistory(newList);
      });
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
      <Button
        onClick={() => {
          if (!addValue) {
            Swal.fire("Please enter a name");
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
            if (title === "Joyfully Attend") { changeHistoryTable(id, addValue); }

          }
        }}
      >
        Add Guest
      </Button>
      <DropBtn
        onClick={click}
      >
        <DropIcon display={display}>▼</DropIcon>
      </DropBtn>
      <Hr />
    </MainTitleContainer>
  )
}

export default GuestlistMain;