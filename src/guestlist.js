import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import { v4 as uuid } from "uuid";
import GuestlistPack from "./components/GuestlistPack";
import Header from "./components/Header";
import Swal from "sweetalert2";

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

const Container = styled.div`
  background-color: rgb(249, 249, 249);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing:border-box;
`;

const BlockWrap = styled.div`
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  box-shadow: 0px 0px 10px 6px rgba(138, 105, 90, 0.5);
  border-bottom: 20px solid #a49393 ;
  @media (max-width: 1440px) {
    width: 90%;
  }
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

const SubTitleContainer = styled(MainTitleContainer)`
  display: flex;
  align-items: flex-start;
  padding: 16px 16px 24px 16px;
  margin-left: 20px ;
  margin-right: 20px;
  overflow-x: scroll;
  background-color: #fff;

  min-height:200px;

  &:last-child {
    padding-bottom: 20px;
  }
`;
// const Table = styled.table`
//   overflow-x: scroll;
//   white-space: nowrap;
// `;


const Title = styled.div`
  font-size: 24px;
  color: #574e56;
  margin-left: 16px;
`;
const Count = styled(Title)`
  border: 1px solid #cccccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  align-items: center;
 
`;

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
  background-color: #ccc;
  height: 2px;
  border-style: none;
`;

const Th = styled.th`
  text-align: center;
  color: #574e56;
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
  const [yesCount, setYesCount] = useState("");
  const [notCount, setNotCount] = useState("");
  const [noCount, setNoCount] = useState("");
  const [addYes, setAddYes] = useState("");
  const [addNo, setAddNo] = useState("");
  const [addNotSure, setAddNotSure] = useState("");

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
          data.push(doc.data());
        });
        SetAllData(data);
      });
  }, []);

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

        const updateHistory = JSON.stringify(newList);
        const update = {};
        update.guestlist = updateHistory;
        console.log(updateHistory);
        db.collection("users").doc(user.uid).update(update);
      });
  }

  useEffect(() => {
    const copyData = Array.from(allData);
    const yes = copyData.filter((status) => status.status === "yes");
    const not = copyData.filter((status) => status.status === "notSure");
    const no = copyData.filter((status) => status.status === "no");

    const yesNumber = String(yes.length);
    const notNumber = String(not.length);
    const noNumber = String(no.length);
    setYesCount(yesNumber);
    setNotCount(notNumber);
    setNoCount(noNumber);
  }, [allData]);

  return (
    <>
      <Header />
      <Container>
        <BlockWrap>
          <MainTitleContainer>
            <Title>Joyfully Attend</Title>
            <Count>{yesCount}</Count>
            <DropBtn>▼</DropBtn>
            <InputNew
              type="text"
              id="bride-name"
              placeholder="Enter a guest name"
              value={addYes}
              onChange={(e) => setAddYes(e.target.value)}
            // maxLength="9"
            />
            <Button
              onClick={() => {
                if (!addYes) {
                  Swal.fire("Please enter a name");
                  return;
                } else {
                  const id = db.collection("users").doc().id;
                  let body = {
                    name: addYes,
                    status: "yes",
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
                  setAddYes("");
                  changeHistoryTable(id, addYes);
                }
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
                {allData.map((data, index) =>
                  data.status === "yes" ? (
                    <GuestlistPack
                      data={data}
                      index={index}
                      key={data.id}
                      setDeleteId={setDeleteId}
                    ></GuestlistPack>
                  ) : (
                    <></>
                  )
                )}
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
                if (!addNotSure) {
                  Swal.fire("Please enter a name");
                  return;
                } else {
                  const id = db.collection("users").doc().id;
                  let body = {
                    name: addNotSure,
                    status: "notSure",
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
                  setAddNotSure("");
                }
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
                {allData.map((data, index) =>
                  data.status === "notSure" ? (
                    <GuestlistPack
                      data={data}
                      index={index}
                      key={data.id}
                    ></GuestlistPack>
                  ) : (
                    <></>
                  )
                )}
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
                if (!addNo) {
                  Swal.fire("Please enter a name");
                  return;
                } else {
                  const id = db.collection("users").doc().id;
                  let body = {
                    name: addNo,
                    status: "no",
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
                  setAddNo("");
                }
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
                {allData.map((data, index) =>
                  data.status === "no" ? (
                    <GuestlistPack
                      data={data}
                      index={index}
                      key={data.id}
                    ></GuestlistPack>
                  ) : (
                    <></>
                  )
                )}
              </tbody>
            </table>
          </SubTitleContainer>
        </BlockWrap>
      </Container>
    </>
  );
}

export default GuestList;
