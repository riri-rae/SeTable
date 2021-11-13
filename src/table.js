import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./components/Header";

const BlockWrap = styled.div`
  position: relative;
  /* height: 10rem; */
`;

const Block = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ddd;
  background: #b8ab9b;
  border-radius: 16px;
  width: 83%;
  text-align: center;
  height: 340px;
  /* z-index: 1; */
`;
const BlockTitle = styled.div`
  color: #574e56;
  font-size: 2rem;
  margin: 20px 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 12px auto;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
`;

const TaskContainer = styled.div`
  /* margin-top: 212px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > :first-child {
    border: 3px
      ${(props) => (props.isDraggingOver ? "solid #A47E84" : "solid #A47E84")};
    position: fixed;
    top: 250px;
    /* left: 50%; 
    transform: translateX(-50%);  */
    flex-wrap: wrap;
    overflow-x: scroll;
    width: 80%;
    height: 190px;
    padding: 8px 8px 8px 2rem;
    z-index: 90;
  }
  & > :nth-child(2) {
    margin-top: 416px;
  }
`;



const PreTable = styled.div`
  display: flex;
  margin-bottom: 8px;

`;

const TaskRow = styled.div`
  padding: 8px 8px 8px 2rem;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#FDFBF4" : "white")};
  flex-grow: 1;
  display: flex;
  border: 3px solid #B8AB9B;
  border-radius: 16px;
  min-height: 7rem;
  width: 80%;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Task = styled.div`
  border: 2px solid #E0D4C3;
  border-radius: 50%;
  padding: 8px;
  margin: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "#b78f95" : "white")};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4F3C34;
`;


function Table({ deleteId }) {
  const [tables, setTables] = useState([]);
  const [myList, setMyList] = useState([]);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    db.collection("users").doc(user.uid)
      .onSnapshot((doc) => {


        let getSaveList = (doc.data().guestlist)
        let saveList = JSON.parse(getSaveList)
        setTables(saveList)
        console.log(saveList);

        // if (doc.exists) {
        //   let getSaveList = (doc.data().guestlist)
        //   let saveList = JSON.parse(getSaveList)
        //   console.log(saveList);
        //   setTables(saveList)
        // } else {
        //   return
        // }


      });
  }, [])

  // .where("status", "==", "yes")

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .onSnapshot((collectionSnapshot) => {
        setMyList(collectionSnapshot.docs.filter((doc) => doc.data().status === 'yes')
          .map((doc) => {
            return {
              id: doc.id,
              content: doc.data().name,
            };
          }));
      })
  }, []);


  useEffect(() => {
    //新增的事情
    const myGuestId = tables.reduce((acc, cur) => {
      return [...acc, ...cur.map(guest => guest.id)]
    }, [])

    myList.forEach((guest) => {

      if (!myGuestId.includes(guest.id)) {
        const newTables = Array.from(tables);
        const [preTable] = newTables.splice(0, 1);
        preTable.push(guest)
        newTables.splice(0, 0, preTable);
        setTables(newTables)
        console.log(newTables)
      }
    });

  }, [myList])

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return tables;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return tables;
    }

    if (
      source.droppableId === destination.droppableId
      && source.index !== destination.index
    ) {
      const reorder = Array.from(tables); //reorder=copy tables[]
      const theTable = reorder[Number(source.droppableId)]; //抓到tables[]裡的哪一張table[]

      const [changeSeat] = theTable.splice(source.index, 1); // 把table array的 source.index 跟 destination.index交換
      theTable.splice(destination.index, 0, changeSeat);

      reorder[Number(source.droppableId)] = theTable

      setTables(reorder);
      // console.log(reorder);
      //存json
      const saveReorder = JSON.stringify(reorder)
      const reoderData = {}
      reoderData.guestlist = saveReorder;

      db.collection("users").doc(user.uid)
        .update(reoderData);
    }

    if (source.droppableId !== destination.droppableId) {
      const move = Array.from(tables); //result=copy tables[]
      const pickTable = move[Number(source.droppableId)]; //抓到tables[]裡的哪一張table[]
      const desTable = move[Number(destination.droppableId)];

      const [moveGuest] = pickTable.splice(source.index, 1);
      desTable.splice(destination.index, 0, moveGuest);

      move[Number(source.droppableId)] = pickTable;
      move[Number(destination.droppableId)] = desTable;

      // let newTables = [];
      setTables(move);
      // console.log(move);
      //存json
      const saveMove = JSON.stringify(move)
      const reoderMove = {}
      reoderMove.guestlist = saveMove;

      db.collection("users").doc(user.uid)
        .update(reoderMove);
    }
  }


  return (
    <>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <BlockWrap>
          <Block>
            <BlockTitle>Add more tables to arrange your guests here!</BlockTitle>
            <Button
              type="button"
              onClick={() => {
                setTables([...tables, []]);
                // console.log(state);
              }}
            >
              Add Table
            </Button>
          </Block>
        </BlockWrap>
        <TaskContainer>
          {tables.map((table, ind) => (
            <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
              {(provided, snapshot) => (
                <TaskRow
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {table.map((guest, index) => (
                    <Draggable
                      key={guest.id}
                      draggableId={guest.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Task
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          {guest.content}
                        </Task>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TaskRow>
              )}
            </Droppable>
          ))}
        </TaskContainer>
      </DragDropContext>
    </>
  );
}

export default Table;

