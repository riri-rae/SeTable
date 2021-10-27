import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
`;
const BlockTitle = styled.div`
  color: #574e56;
  font-size: 2rem;
  margin: 16px 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 12px auto;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 30px;
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
    margin-top: 220px;
  }
`;

const TaskRow = styled.div`
  padding: 8px 8px 8px 2rem;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#FDFBF4" : "white")};
  flex-grow: 1;
  display: flex;
  border: 3px solid #ccc;
  border-radius: 4px;
  min-height: 7rem;
  width: 80%;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Task = styled.div`
  border: 2px solid lightgrey;
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
`;

// firebase data
const db = firebase.firestore();

//Moves an item from one list to another list.

function Table() {
  const [tables, setTables] = useState([]);
  const [myList, setMyList] = useState([])
  //位子的紀錄用json存到使用者資訊裡
  //在桌位要撈出來之前先過濾跟ＲＳＶＰ裡面一樣的資料才放出來（for loop）
  useEffect(() => {
    db.collection("users").doc("0pNg8BybCeidJQXjrYiX")
      .onSnapshot((doc) => {
        let getSaveList = (doc.data().guestlist)
        let saveList = JSON.parse(getSaveList)
        console.log(saveList);
        setTables(saveList)
      });

  }, [])

  useEffect(() => {
    const myList = [];
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .onSnapshot((collectionSnapshot) => {
        collectionSnapshot.docs.forEach((doc) => {
          let allList = doc.data().guestlist;
          let groupId = doc.id;
          const newAllList = allList.map((name) => {
            return {
              id: `${groupId}-${name}`,
              content: name,
            };
          });
          // console.log(...newAllList) 
          //{id: 'HzXhHCEH7txUm8bqdAq8-123', content: '123'} {id: 'HzXhHCEH7txUm8bqdAq8-456', content: '456'}
          myList.push(...newAllList);
          console.log(myList);
          setMyList(myList)
          // console.log(myList) 
          //[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          // console.log(...myList)
          // {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}
          // console.log([myList]) 
          // [[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]]
          //要先過濾資訊才set成要撈的資訊
          // if (e.target.data-rbd-droppable-id ==='0'){
          //   const fromRsvp = JSON.parse(guestlist)
          //   const rsvpList = 
          // }


          //setTables([myList]);

        });
      })
  }, []);

  useEffect(() => {
    const myGuest = tables.reduce((cur, acc) => {
      return [...acc, ...cur.map(guest => guest.id)]
    }, [])
    myList.forEach((guest) => {
      if (!myGuest.includes(guest.id)) {
        const newTables = Array.from(tables); //reorder=copy tables[]
        const [preTable] = newTables.splice(0, 1); // 把table array的 source.index 跟 destination.index交換
        preTable.push(guest)
        console.log(preTable);
        newTables.splice(0, 0, preTable);
        setTables(newTables)
      }
    });
  }, [myList])





  // const result = {
  //   draggableID: "task-1",
  //   source: {
  //     droppableID: "colum-1",
  //     index: 0,
  //   },
  //   destination: {
  //     droppableID: "colum-1",
  //     index: 1,
  //   },
  // };

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
      console.log(reorder);
      //存json, 第0張桌子不存
      const saveReorder = JSON.stringify(reorder)
      const reoderData = {}
      reoderData.guestlist = saveReorder;

      db.collection("users").doc("0pNg8BybCeidJQXjrYiX")
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
      console.log(move);
      //存json，第0張桌子不存
      const saveMove = JSON.stringify(move)
      const reoderMove = {}
      reoderMove.guestlist = saveMove;

      db.collection("users").doc("0pNg8BybCeidJQXjrYiX")
        .update(reoderMove);
    }
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BlockWrap>
        <Block>
          <BlockTitle>Arrange your table here!</BlockTitle>
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
  );
}

export default Table;

// A semi-generic way to handle multiple lists. Matches
// the IDs of the droppable container to the names of the
// source arrays stored in the state.
