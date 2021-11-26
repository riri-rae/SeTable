import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { updateHistory } from "../../utils/firebaseFunction";
import { Button } from "../../components/style/generalStyle";
import firebase from "../../utils/firebase";
import { useParams } from "react-router";
import "firebase/firestore";
import "firebase/auth";
import RsvpPack from "./RsvpPack";
import Swal from "sweetalert2";


const Edit = styled.div`
  font-size: 22px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 36px 36px 36px;
  color: #67595e;
  padding-top: 100px;
  @media (max-width: 1440px) {
    font-size: 18px;
    padding: 20px;
  }
  @media (max-width: 1320px) {
    padding: 60px 10rem;
  }

`;
const Frame = styled.div`
  background-image: url("/images/frame-brown.png");
  background-position: center;
  /* background-attachment: fixed; */
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 36px;
`;
const EditTitle = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
  /* margin-bottom: 20px; */
  text-align: center;
  letter-spacing: 1px;

`;

const EditTitleBig = styled(EditTitle)`
  font-size: 48px;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  letter-spacing: 4px;
  padding-bottom: 28px;
  /* margin-bottom: 20px; */
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 46px;
  }
`;

const Formwrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputWrap = styled.div`
  display: flex;
  /* height: 32px; */
  margin: 16px;
  vertical-align: middle;
  @media (max-width: 1440px) {
    margin-top:8px;
    margin-bottom:8px;
  }
`;

const InputWrapBlock = styled(InputWrap)`
  @media (max-width: 1680px) {
    flex-wrap:wrap;
  }
`;

const Input = styled.input`
  border: 1px solid #ddd;
  height: 22px;
  font-size: 16px;
  margin-left: 8px;
  vertical-align: middle;
  outline: none;
  border-radius: 5px;
  padding: 8px;
  color: #44342d;
  letter-spacing: 1px;
 
`;


const Label = styled.div`
  float: left;
  text-align: right;
  line-height: 32px;
`;

const LabelBlock = styled(Label)`

  @media (max-width: 1440px) {
    width: 100%;
    float: none;
    text-align: left;
  }
`;

const SelectStyle = styled(Select)`
  min-width: 160px;
  font-size: 16px;
  margin-left: 16px;
  min-height: 32px;
  color: #44342d;
  outline: none !important;
  &:focus{
    outline: none !important;
  }
  @media (max-width: 1680px) {
    margin-left: 12px;
  }
  @media (max-width: 1440px) {
    margin-left: 0px;
  }
`;
const SelectStyleLong = styled(SelectStyle)`

  @media (max-width: 1662px) {
    margin-left: 0px;
    margin-top: 4px;
  }
  /* @media (max-width: 1440px) {
    margin-left: 0px;
  } */
`;

const Textarea = styled.textarea`
  resize: none;
  height: 36px;
  line-height: 36px;
  border-radius: 8px;
  margin-left: 8px;
  min-width: 280px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 8px;
  color: #44342d;
  outline: none;
`;

const RsvpMain = () => {
  const { userid } = useParams();
  const [group, setGroup] = useState("");
  const [note, setNote] = useState("");

  const [allData, setAllData] = useState([]);
  console.log(allData)

  const [tag, setTag] = useState("");
  const tags = [
    { value: "brides-side", label: "Bride Side" },
    { value: "groom-side", label: "Groom Side" },
  ];

  const [role, setRole] = useState("");
  const roles = [
    { value: "friend", label: "Friend" },
    { value: "family", label: "Family" },
  ];

  const [status, setStatus] = useState("");
  const allstatus = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "notSure", label: "Not Sure" },
  ];

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  function sendForm() {
    let id = db.collection("users").doc(userid).collection("rsvp").doc().id;
    let rsvpRef = db.collection("users").doc(userid).collection("rsvp").doc(id);
    if (group === "") {
      Swal.fire("", "Please let us know who is filling this form?", "question");
    } else if (tag === "") {
      Swal.fire("", "Please let us you are from which side?", "question");
    } else if (role === "") {
      Swal.fire("", "Please let us you are our?", "question");
    } else if (status === "") {
      Swal.fire("", "Please let us know if you will attand", "question");
    } else {
      const allId = [];
      if (allData.length === 0) {
        rsvpRef.set({
          name: group,
          group,
          status: status.value,
          tag: tag.value,
          role: role.value,
          baby: "",
          veggie: "",
          note,
          id,
          time: firebase.firestore.Timestamp.now(),
        })
          .then(() => { afterSend() });
      } else {
        allData.forEach((data) => {
          let id = db.collection("users").doc(userid).collection("rsvp").doc().id;
          allId.push(id);
          let rsvpRef = db.collection("users").doc(userid).collection("rsvp").doc(id);
          if (!data.name) {
            Swal.fire("", "Please fill in guest name", "question");
          } else if (!data.veggie) {
            Swal.fire("", "Vegetarian meal?", "question");
          } else if (!data.baby) {
            Swal.fire("", "Require baby seat?", "question");
          } else {
            rsvpRef.set({
              name: data.name,
              group,
              status: status.value,
              tag: tag.value,
              role: role.value,
              note,
              id,
              baby: data.baby,
              veggie: data.veggie,
              time: firebase.firestore.Timestamp.now(),
            });
          }
        });
        addHistoryTable(allId);
      }
    }
  }


  function addHistoryTable(allId) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const history = doc.data().guestlist;
        const historyList = JSON.parse(history);
        const [preTable] = historyList.splice(0, 1);
        historyList.splice(0, 0, preTable);
        const newList = [
          ...allData.map((data, index) => ({
            id: allId[index],
            content: data.name,
          })),
          ...preTable,
        ];
        const updateFirebaseHistory = JSON.stringify([newList, ...historyList.slice(1)]);
        updateHistory(user.uid, updateFirebaseHistory)
      })
      .then(() => { afterSend() });
  }

  function afterSend() {
    Swal.fire({
      icon: 'success',
      title: 'Thank you! Have a nice day • u •',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      showConfirmButton: false,
      timer: 1800
    })
      .then(() => {
        setAllData([]);
        setGroup("");
        setTag("");
        setRole("");
        setNote("");
        setStatus("");
      })
  }


  useEffect(() => {
    if (status.value === "yes") {
      setAllData([...allData, {}]);
    } else if (status.value === "no" || status.value === "notSure") {
      setAllData([]);
    }
  }, [status.value]);

  return (
    <Edit>
      <EditTitleBig>Invitation</EditTitleBig>
      <EditTitle>
        With joyful hearts,
        <br />
        we ask the honor of your presence on our wedding day！
      </EditTitle>
      <Frame></Frame>
      <Formwrap>
        <InputWrap>
          <Label htmlFor="group-name">This Form is filled by :</Label>
          <Input
            type="text"
            id="group-name"
            placeholder="Enter the name"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </InputWrap>

        <InputWrapBlock>
          <LabelBlock>You are ...</LabelBlock>

          <SelectStyle
            placeholder="Please Select"
            value={tag}
            onChange={(value) => {
              setTag(value);
            }}
            options={tags}
          />
          <SelectStyle
            placeholder="Please Select"
            value={role}
            onChange={(value) => {
              setRole(value);
            }}
            options={roles}
          />
        </InputWrapBlock>

        <InputWrapBlock>
          <LabelBlock>Will you be able to join us at our wedding ?</LabelBlock>

          <SelectStyleLong
            placeholder="Please Select"
            value={status}
            onChange={(value) => {
              setStatus(value);
            }}
            options={allstatus}
          />
        </InputWrapBlock>

        {allData.map((data, index) => (
          <RsvpPack
            allData={allData}
            setAllData={setAllData}
            index={index}
            key={index}
          />
        ))}
      </Formwrap>
      <Frame></Frame>
      <InputWrap>
        <Label>Note: </Label>
        <Textarea
          placeholder="Anything we need to know?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></Textarea>
      </InputWrap>

      <Button onClick={sendForm}>Send</Button>
    </Edit>
  );
};

export default RsvpMain;
