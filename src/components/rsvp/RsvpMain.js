import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { updateHistory } from "../../utils/firebaseFunction";
import { alert, alertThankyou } from "../../utils/alert";
import { Button } from "../../components/style/generalStyle";
import firebase from "../../utils/firebase";
import { useParams } from "react-router";
import "firebase/firestore";
import "firebase/auth";
import RsvpPack from "./RsvpPack";

const Edit = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #67595e;
  padding-top: 100px;
  @media (max-width: 1320px) {
    font-size: 16px;
  }
`;

const Frame = styled.div`
  background-image: url("/images/frame-brown.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 36px;
`;

const EditTitle = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
  text-align: center;
  letter-spacing: 1px;
  font-size: 16px;
`;

const EditTitleBig = styled(EditTitle)`
  font-size: 48px;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  letter-spacing: 4px;
  padding-bottom: 28px;
  text-align: center;
  @media (max-width: 1919px) {
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
  margin: 8px;
  vertical-align: middle;
  align-items: center;
  @media (max-width919) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  @media (max-width: 425px) {
    flex-wrap: wrap;
  }
`;
const NoteWrap = styled(InputWrap)`
  flex-wrap: nowrap;
  @media (max-width: 424px) {
    flex-wrap: wrap;
  }
`;

const InputWrapBlock = styled(InputWrap)`
  @media (max-width: 1919px) {
    flex-wrap: wrap;
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
  @media (max-width: 424px) {
    margin-left: 0px;
  }
`;

const Label = styled.div`
  float: left;
  text-align: right;
  line-height: 32px;
  @media (max-width: 425px) {
    width: 100%;
    float: none;
    text-align: left;
  }
`;

const LabelBlock = styled(Label)`
  @media (max-width: 1919px) {
    width: 100%;
    float: none;
    text-align: left;
  }
`;

const SelectStyle = styled(Select)`
  min-width: 160px;
  font-size: 16px;
  margin: 0 12px;
  min-height: 32px;
  color: #44342d;
  outline: none !important;
  &:focus {
    outline: none !important;
  }
  @media (max-width: 1919px) {
    margin-left: 0px;
  }
  @media (max-width: 425px) {
    margin: 4px 12px;
    margin-left: 0;
  }
`;
const SelectStyleLong = styled(SelectStyle)`
  @media (max-width: 1662px) {
    margin-left: 0px;
    margin-top: 4px;
  }
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
  @media (max-width: 424px) {
    margin-left: 0px;
  }
`;

const RsvpMain = () => {
  const { userid } = useParams();
  const [group, setGroup] = useState("");
  const [note, setNote] = useState("");
  const [allData, setAllData] = useState([]);

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
      alert(
        "Empty Name!",
        "Please let us know who is filling this form?",
        "question"
      );
    } else if (tag === "") {
      alert(
        "Empty Selector!",
        "Please let us you are from which side?",
        "question"
      );
    } else if (role === "") {
      alert("Empty Selector!", "Please let us you are our?", "question");
    } else if (status === "") {
      alert("Attending?", "Please let us know if you will attand", "question");
    } else {
      const allId = [];
      if (allData.length === 0) {
        rsvpRef
          .set({
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
          .then(() => {
            afterSend();
          });
      } else {
        allData.forEach((data) => {
          let id = db
            .collection("users")
            .doc(userid)
            .collection("rsvp")
            .doc().id;
          allId.push(id);
          let rsvpRef = db
            .collection("users")
            .doc(userid)
            .collection("rsvp")
            .doc(id);
          if (!data.name) {
            return alert(
              "Empty Name!",
              "Please fill in guest name",
              "question"
            );
          } else if (!data.veggie) {
            return alert("Vegetarian meal?", "Please select", "question");
          } else if (!data.baby) {
            return alert("Require baby seat?", "Please select", "question");
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
            addHistoryTable(allId);
          }
        });
      }
    }
  }

  function addHistoryTable(allId) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const historyList = JSON.parse(doc.data().guestlist);
        const [preTable] = historyList.splice(0, 1);
        historyList.splice(0, 0, preTable);
        const newList = [
          ...allData.map((data, index) => ({
            id: allId[index],
            content: data.name,
          })),
          ...preTable,
        ];
        updateHistory(user.uid, [newList, ...historyList.slice(1)]);
      })
      .then(() => {
        afterSend();
      });
  }

  function afterSend() {
    alertThankyou().then(() => {
      setAllData([]);
      setGroup("");
      setTag("");
      setRole("");
      setNote("");
      setStatus("");
    });
  }

  useEffect(() => {
    if (status.value === "yes") {
      setAllData([...allData, {}]);
    } else if (status.value === "no" || status.value === "notSure") {
      setAllData([]);
    }
  }, [status.value]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <NoteWrap>
        <Label>Note: </Label>
        <Textarea
          placeholder="Anything we need to know?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></Textarea>
      </NoteWrap>

      <Button onClick={sendForm}>Send</Button>
    </Edit>
  );
};

export default RsvpMain;
