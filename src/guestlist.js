import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";

const BlockWrap = styled.div`
  position: relative;
  height: 10rem;
`;

const Block = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ddd;
  background: #b8ab9b;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const BlockTitle = styled.div`
  color: #574e56;
  font-size: 2rem;
  margin: 16px 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:4px;
  padding: 0.5rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:24px;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  width: 76%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
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

// const TaskRow = styled.div`
//   padding: 8px 8px 8px 2rem;
//   margin-bottom: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${(props) => (props.isDraggingOver ? "#FDFBF4" : "white")};
//   flex-grow: 1;
//   display: flex;
//   border: 3px solid #ccc;
//   border-radius: 4px;
//   min-height: 7rem;
//   width: 80%;
//   flex-wrap: wrap;
//   box-sizing: border-box;
// `;

// const Task = styled.div`
//   border: 2px solid lightgrey;
//   border-radius: 50%;
//   padding: 8px;
//   margin: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${(props) => (props.isDragging ? "#b78f95" : "white")};
//   width: 50px;
//   height: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// firebase data


const db = firebase.firestore();

function GuestList() {
  const [state, setState] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // const guestList = [];
          let allList = doc.data().guestlist;
          let groupId = doc.id;
          const newAllList = allList.map((name) => {
            return {
              id: `${groupId}-${name}`,
              name: name,
            };
          });
          // console.log(guestList.push().concat(...newAllList));
          console.log(newAllList);

        });

      });
  }, []);

  return (
    <>
      <BlockWrap>
        <Block>
          <BlockTitle>Arrange your guests here!</BlockTitle>
          {/* <Input /> */}
          {/* <Button
            type="button"
            onClick={() => {
              setState([...state, []]);
            }}
          >
            search
          </Button> */}
        </Block>
      </BlockWrap>
      <Container>
        <Title>Joyfully Attend</Title>
        <Count>50</Count>
        <DropBtn>▼</DropBtn>
        <Input />
        <Button
          type="button"
          onClick={() => {
            setState([...state, []]);
          }}
        >
          Add Guest
        </Button>
        <Hr />
      </Container>
      <Container>
      </Container>
      <Container>
        <Title>Regretfully Decline</Title>
        <Count>8</Count>
        <DropBtn>▼</DropBtn>
        <Hr />
      </Container>
      <Container>
      </Container>
      <Container>
        <Title>Not Sure</Title>
        <Count>5</Count>
        <DropBtn>▼</DropBtn>
        <Hr />
      </Container>
      <Container>
      </Container>

    </>
  );
}

export default GuestList;
