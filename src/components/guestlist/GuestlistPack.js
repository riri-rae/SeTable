import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import updateHistory from "../../utils/updateHistory";
import "firebase/firestore";
import "firebase/auth";
import Swal from 'sweetalert2'
import { RiDeleteBinLine } from "react-icons/ri";

const Tr = styled.tr`
  font-family: "Karla", sans-serif;
  font-size: 14px;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 0px auto;
  /* margin-left:24px; */
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
  vertical-align:middle;
  height:36px;
  line-height:20px;
  font-family: "Karla", sans-serif;
  padding-top: 6px;
  box-sizing: border-box;
  font-size: 14px;
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
  &:hover{
    transition-duration: 0.1s;
    background-color: #A49393;
    color:#fff
  }
  :active {
  background-color: #DCAE96;
  box-shadow: 1px 2px #ccc;
  transform: translateY(3px);
}
`;


const DelIcon = styled(RiDeleteBinLine)`
font-size: 20px;
margin-top:6px;
`

const DelButton = styled(Button)`
  /* display: flex; */
  /* align-items: center; */
  border: none;
  &:hover{
    background-color: #fff;
    color: #9B5B5B;
  }
`;

function GuestlistPack({ data }) {
  const [name, setName] = useState(data.name);
  const [group, setGroup] = useState(data.group);
  const [note, setNote] = useState(data.note);

  const [tag, setTag] = useState(data.tag);
  const [role, setRole] = useState(data.role);
  const [veggie, setVeggie] = useState(data.veggie);
  const [baby, setBaby] = useState(data.baby);


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
        note,
      })
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      });
  }


  function handelDel() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5885AF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        db.collection("users")
          .doc(user.uid)
          .collection("rsvp")
          .doc(data.id)
          .delete();

      }
    })


    const guestToDelete = data.id;
    console.log(guestToDelete);

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const history = doc.data().guestlist;
        const historyList = JSON.parse(history);
        console.log(historyList);

        function findTablesIndex(historyList, guestToDelete) {
          var tablesInd;
          var tableInd;
          for (tablesInd = 0; tablesInd < historyList.length; ++tablesInd) {
            const nsDetails = historyList[tablesInd];
            for (tableInd = 0; tableInd < nsDetails.length; ++tableInd) {
              const tempObject = nsDetails[tableInd];
              if (tempObject.id === guestToDelete) {
                console.log(tablesInd, tableInd);
                return { tablesInd, tableInd };
              }
            }
          }
          return {};
        }

        let { tablesInd, tableInd } = findTablesIndex(
          historyList,
          guestToDelete
        );
        console.log(tablesInd, tableInd);

        let afterDelete = Array.from(historyList);

        const [deleteTable] = afterDelete.splice(tablesInd, 1);//抓桌子
        console.log([deleteTable]);
        deleteTable.splice(tableInd, 1);
        console.log(deleteTable);
        historyList.splice(tablesInd, 1, deleteTable);//
        // console.log(historyList);
        updateHistory(historyList)

      });
  }

  return (

    <Tr>
      <Td>
        <NameDiv><GuestName>{name}</GuestName></NameDiv>
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
          <option value="" disabled selected>
            ---
          </option>
          <option value="bride-side">Brides' Side</option>
          <option value="groom-side">Groom's Side</option>
        </Select>
      </Td>
      <Td>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled selected>
            ---
          </option>
          <option value="friend">Friend</option>
          <option value="family">Family</option>
        </Select>
      </Td>
      <Td>
        <Select value={veggie} onChange={(e) => setVeggie(e.target.value)}>
          <option value="" disabled selected>
            ---
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </Td>
      <Td>
        <Select value={baby} onChange={(e) => setBaby(e.target.value)}>
          <option value="" disabled selected>
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
        <Button onClick={saveChange}>Save</Button>
      </Td>
      <Td>
        <DelButton onClick={() => handelDel()}><DelIcon /></DelButton>
      </Td>
    </Tr>
  );
}

export default GuestlistPack;
