import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { v4 as uuid } from "uuid";

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 4px;
  padding: 0.5rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
`;

const DelButton = styled(Button)`
  /* display: flex; */
  /* align-items: center; */
  margin: 0 auto;
  /* margin-left:4px; */
  padding: 0.4rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
`;

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
  /* text-align: center;
  max-width: 6rem; */
`;

const Td = styled.td`
  text-align: center;
  color: #574e56;
  line-height: 36px;
  border-bottom: 1px solid #ddd;

  &:nth-child(7) {
    width: 12rem;
  }
`;

const Select = styled.select`
  color: #000;
  text-align: center;
  margin-left:8px;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
`;

function GuestlistPack({ data, setDeleteId }) {
  const [name, setName] = useState(data.name);
  const [group, setGroup] = useState(data.group);
  const [tag, setTag] = useState(data.tag);
  const [role, setRole] = useState(data.role);
  const [veggie, setVeggie] = useState(data.veggie);
  const [baby, setBaby] = useState(data.baby);
  const [note, setNote] = useState(data.note);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  function saveChange() {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .doc(data.id)
      .update({
        name,
        group,
        tag,
        role,
        baby,
        veggie,
        note
      })
      .then(() => {
        window.alert("Change Saved!");
      })
  }

  function handelDel() {
    // setDeleteId(data.id);

    // db.collection("users")
    //   .doc(user.uid)
    //   .collection("rsvp")
    //   .doc(data.id)
    //   .get().then((doc) => {
    //     let guestToDelete = doc.data()
    //     console.log(guestToDelete)
    //   })

    //const guestToDelete = db.collection("users").doc(user.uid).collection("rsvp").doc(data.id)
    const guestToDelete = data.id
    console.log(guestToDelete)

    db.collection("users").doc(user.uid).get().then((doc) => {
      const history = (doc.data().guestlist)
      const historyList = JSON.parse(history)
      console.log(historyList)

      function findTablesIndex(historyList, id) {
        var tablesInd;
        var tableInd;
        for (tablesInd = 0; tablesInd < historyList.length; ++tablesInd) {
          const nsDetails = historyList[tablesInd];
          for (tableInd = 0; tableInd < nsDetails.length; ++tableInd) {
            const tempObject = nsDetails[tableInd];
            if (tempObject.id === id) {
              console.log(tablesInd, tableInd)
              return { tablesInd, tableInd };
            }
          }
        }
        return {};
      }

      let { tablesInd, tableInd } = findTablesIndex(historyList, guestToDelete);
      console.log(tablesInd, tableInd)
      // let afterDelete = Array.from(historyList);

      const [deleteTable] = historyList.splice(tablesInd, 1); //把桌子抓出來
      console.log(deleteTable)
      deleteTable.splice(tableInd, 1)
      historyList.splice(tablesInd, 0, deleteTable);//再把deleteTable塞回tables[]
      // setTables(afterDelete)
      console.log(historyList)

      const updateHistory = JSON.stringify(historyList)
      const update = {}
      update.guestlist = updateHistory;
      console.log(updateHistory)

      db.collection("users").doc(user.uid)
        .update(update);

    })


    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .doc(data.id)
      .delete()
      .then(() => {
        window.alert("Document successfully deleted!");
      })

  }


  return (
    <tr>
      <Td>
        <Input
          type="text"
          id="bride-name"
          placeholder="Edit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Td>
      <Td>
        <Input
          type="text"
          id="group-name"
          placeholder="Edit"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
      </Td>

      <Td>
        <Select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="" disabled selected>Please Select</option>
          <option value="brides-side">Brides' side</option>
          <option value="grooms-side">Groom's side</option>
        </Select>
      </Td>
      <Td>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled selected>Please Select</option>
          <option value="friend">Friend</option>
          <option value="family">Family</option>
        </Select>
      </Td>
      <Td>
        <Select value={veggie} onChange={(e) => setVeggie(e.target.value)}>
          <option value="" disabled selected>Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
      </Td>
      <Td>
        <Select value={baby} onChange={(e) => setBaby(e.target.value)}>
          <option value="" disabled selected>Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </Td>

      <Td>
        <Textarea
          placeholder="Add note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></Textarea>
      </Td>
      <Td>
        <DelButton
          onClick={saveChange}
        >
          Save
        </DelButton>
      </Td>
      <Td>
        <DelButton
          onClick={() => handelDel()}
        >
          Delete</DelButton>
      </Td>
    </tr>
  );
}

export default GuestlistPack;
