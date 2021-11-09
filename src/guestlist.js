import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { v4 as uuid } from "uuid";
import GuestlistPack from "./components/GuestlistPack";
import Header from "./components/Header";

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:4px;
  padding: 0.5rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
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
  text-align: center;
  max-width: 6rem;
`;

const InputNew = styled(Input)`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:24px;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  max-width: 100%;
  text-align: left;
`;

const MainTitleContainer = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
`;

const SubTitleContainer = styled(MainTitleContainer)`
  padding: 0px 16px 24px 16px;

  &:last-child{
   padding-bottom: 160px;
 }
`;


const Title = styled.div`
  font-size: 20px;
  color: #574e56;
  margin-left: 16px;
`;
const Count = styled(Title)``;

const DropBtn = styled.button`
  margin-left: 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;
// const button = styled(DropBtn)`
//   font-size: 14px;
//   border: 1px solid #ddd;
//   background: #fff;
//   border-radius: 5px;
//   cursor: pointer;
// `;

const Hr = styled.hr`
  width: 100%;
  margin-top: 8px;
  background-color: #e5c290;
  height: 2px;
  border-style: none;
`;

const Th = styled.th`
 text-align:center;
 color:#574E56;
 font-size: 16px;
`;



//const db = firebase.firestore();

function GuestList() {
  const [allData, SetAllData] = useState([]);
  const [addYes, setAddYes] = useState('');
  const [addNo, setAddNo] = useState('');
  const [addNotSure, setAddNotSure] = useState('');

  const db = firebase.firestore();
  useEffect(() => {
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          // let group = doc.data().group;
          let guestlist = doc.data().guestlist;
          // let tag = doc.data().tag;
          // console.log(group)
          console.log(guestlist[0].content)
          // console.log(tag)
        });
        SetAllData(data);
        console.log(allData)
      })
  }, []);

  function onSubmit(body, id) {
    const rsvp = db
      .collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .doc(id);
    rsvp.set(body);
  }

  return (
    <>
      <Header />
      <MainTitleContainer>
        <Title>Joyfully Attend</Title>
        <Count>50</Count>
        <DropBtn >▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a new name"
          value={addYes}
          onChange={(e) => setAddYes(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              guestlist: [
                {
                  id: uuid(),
                  content: addYes,
                },
              ],
              status: 'yes',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              id
              // userid
            };
            onSubmit(body, id);
          }}
        >
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Save</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, index) => (
              data.status === 'yes' ?
                <GuestlistPack data={data} index={index} ></GuestlistPack>
                : <></>
            ))
            }

          </tbody>
        </table>
      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Not Sure</Title>
        <Count>8</Count>
        <DropBtn>▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a new name"
          value={addNotSure}
          onChange={(e) => setAddNotSure(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              guestlist: [
                {
                  id: uuid(),
                  content: addNotSure,
                },
              ],
              status: 'notSure',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              id
              // userid
            };
            onSubmit(body, id);
          }}
        >
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>

      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Save</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, index) => (
              data.status === 'notSure' ?
                <GuestlistPack data={data} index={index}></GuestlistPack>
                : <></>
            ))
            }
          </tbody>
        </table>

      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Regretfully Decline</Title>
        <Count>5</Count>
        <DropBtn>▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a new name"
          value={addNo}
          onChange={(e) => setAddNo(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              guestlist: [
                {
                  id: uuid(),
                  content: addNo,
                },
              ],
              status: 'no',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              id
            };
            onSubmit(body, id);
          }}
        >
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Save</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, index) => (
              data.status === 'no' ?
                <GuestlistPack data={data} index={index}></GuestlistPack>
                : <></>
            ))
            }
          </tbody>
        </table>

      </SubTitleContainer>
    </>
  );
}

export default GuestList;
