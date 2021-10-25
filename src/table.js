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

const getItems = (count, offset = 1) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `Test ${k + offset}`,
  }));
console.log(getItems(5));



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  // console.log(result)
  return result;
};

//Moves an item from one list to another list.

const move = (source, destination, droppableSource, droppableDestination) => {
  console.log(source, destination);
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  console.log(result)
  return result;
};

function Table() {
  const [state, setState] = useState([]);
  const [tables, setTables] = useState([]);

  // useEffect(() => {
  //   save state & tables to firestore
  // }, [state, tables]);

  useEffect(() => {
    const myList = [];
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .get()
      .then((collectionSnapshot) => {
        collectionSnapshot.docs.forEach((doc) => {
          let allList = doc.data().guestlist;
          let groupId = doc.id;
          // console.log(allList)
          const newAllList = allList.map((name) => {
            return {
              id: `${groupId}-${name}`,
              content: name,
            };
          });
          // console.log(state);
          // console.log(newAllList);
          myList.push(...newAllList);
        });
      })
      .then(() => {
        setState([...state, ...myList]);
        setTables([...tables, myList]);
      });
  }, []);


  function onDragEnd(result) {
    console.log(tables)
    const { source, destination } = result;
    console.log(source, destination);
    console.log(result)
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    console.log(typeof sInd);
    const dInd = +destination.droppableId;
    console.log(sInd, dInd);
    if (sInd === dInd) {
      const items = reorder(state, source.index, destination.index);
      console.log(state)
      // const newState = [...state];
      // newState[sInd] = items;
      setState(items);
    } else {
      const result = move(
        tables[Number(sInd)],
        tables[Number(dInd)],
        source,
        destination
      );
      const newState = [...state];
      tables[Number(sInd)] = result[sInd];
      tables[Number(dInd)] = result[dInd];
      setState(newState);
      console.log(newState)
      // setTables(newState);
    }

    // save state to firestore
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
        {/* <Droppable key={0} droppableId='777' direction="horizontal">
          {(provided, snapshot) => (
            <TaskRow
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {state.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Task
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      {item.content}
                    </Task>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TaskRow>
          )}
        </Droppable> */}
        {tables.map((table, ind) => (
          <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
            {(provided, snapshot) => (
              <TaskRow
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {table.map((guest, index) => (
                  <Draggable key={guest.id} draggableId={guest.id} index={index}>
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



// How about giving your cards something to make them distinguishable,
//like an ID or a specific (numbered?) class?
//After dragging you could simply store the position
//(which area, what position) of every card and "shift" them back into their place after reload …

// Just find a system to store the position of each card that fits best your needs and your preferences. Like "card1, area5, position3". Put that into an js object and store it into local storage.
// Write a script that moves your cards into the stored positions. Done ;)

// useEffect(() => {
//   db.collection('users').doc('0pNg8BybCeidJQXjrYiX').collection('rsvp')
//     .get()
//     .then((collectionSnapshot) => {
//       collectionSnapshot.forEach((doc) => {
//         const guestList = [];
//         let allList = doc.data().guestlist
//         let groupId = doc.id;
//         const newAllList = allList.map((name) => {
//           return {
//             id: `${groupId}-${name}`,
//             name: name
//           }
//         })
//         console.log(newAllList);
//       });

//     })
// }, []);
