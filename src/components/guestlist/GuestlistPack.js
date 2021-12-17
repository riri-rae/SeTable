import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { alertWithTimer } from "../../utils/alert";
import {
  updateHistory,
  saveGuestlistPack,
  deleteGuestlistPack,
  getUserData,
} from "../../utils/firebaseFunction";
import "firebase/firestore";
import "firebase/auth";
import { reConfirm } from "../../utils/alert";
import { RiDeleteBinLine } from "react-icons/ri";

const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 0px auto;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 120px;
  text-align: center;
`;
const NameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  padding: 0.5rem;
  color: #000;
  cursor: pointer;
  font-size: 18px;
  font-family: "Karla", sans-serif;
  @media (max-width: 1440px) {
    width: 150px;
  }
`;

const GuestName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
`;

const Tr = styled.tr`
  font-family: "Karla", sans-serif;
  font-size: 14px;
`;

const Td = styled.td`
  text-align: center;
  color: #574e56;
  line-height: 36px;
  border-bottom: 1px solid #ddd;
  &:nth-child(7) {
    width: 12rem;
  }
  @media (min-width: 1440px) {
    width: 8rem;
    &:nth-child(8) {
      width: 6rem;
    }
    &:nth-child(9) {
      width: 6rem;
    }
  }
`;

const Select = styled.select`
  box-shadow: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  background-image: none;
  flex: 1;
  padding: 0 0.5em;
  color: #000;
  cursor: pointer;
  font-size: 1em;
  height: 32px;
  width: 120px;
  text-align: center;
`;

const Textarea = styled.textarea`
  resize: none;
  border-radius: 5px;
  border: 1px solid #ddd;
  vertical-align: middle;
  height: 36px;
  line-height: 20px;
  font-family: "Karla", sans-serif;
  padding: 6px 0 0 4px;
  box-sizing: border-box;
  font-size: 14px;
  width: 12rem;
`;

const Button = styled.button`
  font-weight: 600;
  margin: 0 auto;
  padding: 0.4rem;
  color: #574e56;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    transition-duration: 0.1s;
    background-color: #dbbaaf;
    border: 2px solid #dbbaaf;
    color: #fff;
  }
  :active {
    background-color: #dcae96;
    box-shadow: 1px 2px #ccc;
    transform: translateY(3px);
  }
`;

const DelIcon = styled(RiDeleteBinLine)`
  font-size: 20px;
  margin-top: 6px;
`;

const DelButton = styled(Button)`
  border: none;
  &:hover {
    background-color: #fff;
    color: #c45433;
    border: none;
  }
`;

function GuestlistPack({ data }) {
  const name = data.name;
  const [group, setGroup] = useState(data.group);
  const [note, setNote] = useState(data.note);
  const [tag, setTag] = useState(data.tag);
  const [role, setRole] = useState(data.role);
  const [veggie, setVeggie] = useState(data.veggie);
  const [baby, setBaby] = useState(data.baby);

  const user = firebase.auth().currentUser;

  function saveChange() {
    saveGuestlistPack(
      user.uid,
      data.id,
      name,
      group,
      tag,
      role,
      baby,
      veggie,
      note
    ).then(() => {
      alertWithTimer("Success!", "Your work has been saved", "success");
    });
  }

  function handelDel() {
    reConfirm(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!"
    ).then((result) => {
      if (result.isConfirmed) {
        alertWithTimer("Deleted!", "Your file has been deleted", "success");
        deleteGuestlistPack(user.uid, data.id);
      }
    });

    const guestToDelete = data.id;

    getUserData(user.uid, handelDelHistory);
    function handelDelHistory(doc) {
      const historyList = JSON.parse(doc.data().guestlist);
      function findTablesIndex(historyList, guestToDelete) {
        var tablesInd;
        var tableInd;
        for (tablesInd = 0; tablesInd < historyList.length; ++tablesInd) {
          const nsDetails = historyList[tablesInd];
          for (tableInd = 0; tableInd < nsDetails.length; ++tableInd) {
            const tempObject = nsDetails[tableInd];
            if (tempObject.id === guestToDelete) {
              return { tablesInd, tableInd };
            }
          }
        }
        return {};
      }

      let { tablesInd, tableInd } = findTablesIndex(historyList, guestToDelete);
      let afterDelete = Array.from(historyList);
      const [deleteTable] = afterDelete.splice(tablesInd, 1);
      deleteTable.splice(tableInd, 1);
      historyList.splice(tablesInd, 1, deleteTable);
      updateHistory(user.uid, historyList);
    }
  }

  return (
    <Tr>
      <Td>
        <NameDiv>
          <GuestName>{name}</GuestName>
        </NameDiv>
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
        <Select defaultValue={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="" disabled>
            ---
          </option>
          <option value="bride-side">Brides' Side</option>
          <option value="groom-side">Groom's Side</option>
        </Select>
      </Td>
      <Td>
        <Select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            ---
          </option>
          <option value="friend">Friend</option>
          <option value="family">Family</option>
        </Select>
      </Td>
      <Td>
        <Select
          defaultValue={veggie}
          onChange={(e) => setVeggie(e.target.value)}
        >
          <option value="" disabled>
            ---
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </Td>
      <Td>
        <Select defaultValue={baby} onChange={(e) => setBaby(e.target.value)}>
          <option value="" disabled>
            ---
          </option>
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
        <Button
          onClick={() => {
            saveChange(
              user.uid,
              data.id,
              name,
              group,
              tag,
              role,
              baby,
              veggie,
              note
            );
          }}
        >
          Save
        </Button>
      </Td>
      <Td>
        <DelButton onClick={() => handelDel()}>
          <DelIcon />
        </DelButton>
      </Td>
    </Tr>
  );
}

export default GuestlistPack;
