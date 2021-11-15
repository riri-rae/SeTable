import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { v4 as uuid } from "uuid";
import GuestlistPack from "./components/GuestlistPack";
import Header from "./components/Header";

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   margin: 16px;
//   margin-left:4px;
//   padding: 0.5rem;
//   color: #574e56;
//   border: 1px solid #ddd;
//   background: #fff;
//   border-radius: 16px;
//   font-size: 1rem;
//   cursor: pointer;
// `;



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
  letter-spacing: 1px;
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
  width:78%;
  overflow-x:scroll;

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



//const db = firebase.firestore();

function GuestList({ setDeleteId }) {
  const [allData, SetAllData] = useState([]);
  const [yesCount, setYesCount] = useState('');
  const [notCount, setNotCount] = useState('');
  const [noCount, setNoCount] = useState('');
  const [addYes, setAddYes] = useState('');
  const [addNo, setAddNo] = useState('');
  const [addNotSure, setAddNotSure] = useState('');

  const db = firebase.firestore();

  const user = firebase.auth().currentUser;

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .orderBy("time", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          data.push(doc.data())
        });
        SetAllData(data);
      })
  }, []);

  function onSubmit(body, id) {
    const rsvp = db
      .collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .doc(id);
    rsvp.set(body);
  }

  useEffect(() => {
    const copyData = Array.from(allData);
    const yes = copyData.filter(status => status.status === 'yes');
    const not = copyData.filter(status => status.status === 'notSure');
    const no = copyData.filter(status => status.status === 'no');

    const yesNumber = (String(yes.length));
    const notNumber = (String(not.length));
    const noNumber = (String(no.length));
    setYesCount(yesNumber)
    setNotCount(notNumber)
    setNoCount(noNumber)

  }, [allData]);


  return (
    <>
      <Header />
      <MainTitleContainer>
        <Title>Joyfully Attend</Title>
        <Count>{yesCount}</Count>
        <DropBtn >▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a guest name"
          value={addYes}
          onChange={(e) => setAddYes(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              name: addYes,
              status: 'yes',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              time: firebase.firestore.Timestamp.now(),
              id
            };
            onSubmit(body, id);
            setAddYes('');
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
                <GuestlistPack data={data} index={index} key={data.id} setDeleteId={setDeleteId}></GuestlistPack>
                : <></>
            ))
            }
          </tbody>
        </table>
      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Not Sure</Title>
        <Count>{notCount}</Count>
        <DropBtn>▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a guest name"
          value={addNotSure}
          onChange={(e) => setAddNotSure(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              name: addNotSure,
              status: 'notSure',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              time: firebase.firestore.Timestamp.now(),
              id
            };
            onSubmit(body, id);
            setAddNotSure('');
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
                <GuestlistPack data={data} index={index} key={data.id}></GuestlistPack>
                : <></>
            ))
            }
          </tbody>
        </table>

      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Regretfully Decline</Title>
        <Count>{noCount}</Count>
        <DropBtn>▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a guest name"
          value={addNo}
          onChange={(e) => setAddNo(e.target.value)}
        />
        <Button
          onClick={() => {
            const id = db
              .collection("users")
              .doc().id;
            let body = {
              name: addNo,
              status: 'no',
              group: '',
              tag: '',
              role: '',
              baby: '',
              veggie: '',
              note: '',
              time: firebase.firestore.Timestamp.now(),
              id
            };
            onSubmit(body, id);
            setAddNo('')
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
                <GuestlistPack data={data} index={index} key={data.id}></GuestlistPack>
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
