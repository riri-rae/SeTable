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
  background: #A49393;
  border-radius: 16px;
  width: 83%;
  text-align: center;
  height: 340px;
  box-shadow: 0px 0px 10px 3px rgba(112, 100, 100, 0.3);

  /* z-index: 1; */
`;
const BlockTitle = styled.div`
  color: #fff;
  font-size: 36px;
  margin-top: 24px;
  font-weight: 600;
  letter-spacing: 1px;
`;


const BlockTitleSmall = styled(BlockTitle)`
margin-top: 8px;
  font-size: 20px;
  font-weight: 400;
 
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 12px auto;
  margin-top: 204px;
  padding: 0.5rem;
  background-color: #DCAE96;
  box-shadow: 3px 3px 5px 2px rgba(0,0,0,0.5);
  color:#fff;
  border: 1px solid #DCAE96;
  border-radius: 16px;
  font-size: 1rem;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  height: 50px;
  letter-spacing: 1px;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover{
    transition-duration: 0.1s;
    background-color: #DBA083;
    color:#fff
  }
  :active {
  background-color: #A06043;
  box-shadow: 1px 2px #ccc;
  transform: translateY(3px);
  border:none;
}
`;

// const Button = styled.button`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   margin: 16px;
//   margin-left: 4px;
//   padding: 0.4rem 0.8rem;
//   color: #574e56;
//   border: 1px solid #ddd;
//   background: #fff;
//   border-radius: 16px;
//   font-size: 1rem;
//   cursor: pointer;
//   transition-duration: 0.1s;
//   -webkit-transition-duration: 0.1s; /* Safari */
//   &:hover {
//     transition-duration: 0.1s;
//     background-color: #d48c70;
//     color: #fff;
//   }
//   &:after {
//     content: "";
//     display: white;
//     position: absolute;
//     border-radius: 16px;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     opacity: 0;
//     transition: all 0.4s;
//     box-shadow: 0 0 5px 10px rgba(117, 99, 66, 0.5);
//   }

//   &:active:after {
//     box-shadow: 0 0 0 0 rgba(117, 99, 66, 0.9);
//     position: absolute;
//     border-radius: 16px;
//     left: 0;
//     top: 0;
//     opacity: 1;
//     transition: 0s;
//   }

//   &:active {
//     top: 1px;
//   }
// `;

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
    top: 236px;
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
  border: 3px solid #DCAE96;
  border-radius: 50%;
  padding: 6px;
  margin: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "#EED6D3" : "white")};
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4F3C34;
  font-size: 16px;
  /* white-space: nowrap; 
overflow: hidden;
text-overflow: ellipsis; */
`;


function Table({ deleteId }) {
  const [tables, setTables] = useState([]);
  const [myList, setMyList] = useState([]);
  const [userName, setUserName] = useState(null);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserName(doc.data().name);
      });
  }, []);


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
      .orderBy("time", "desc")
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
            <BlockTitle>Guests List of {userName}</BlockTitle>
            <BlockTitleSmall>-Add more tables to arrange your guests-</BlockTitleSmall>

            <Button
              type="button"
              onClick={() => {
                setTables([...tables, []]);
                // console.log(state);
              }}
            >
              + Click to Add Table
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

