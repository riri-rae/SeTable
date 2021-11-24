import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import updateHistory from "./utils/updateHistory";
import "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { CgPlayListRemove } from "react-icons/cg";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Bg = styled.div`
  background-image: url("/images/greenbg.jpeg");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  font-family: "Karla", sans-serif;
  width: 80%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 10px 6px rgba(138, 105, 90, 0.5);
  border-bottom: 20px solid #a49393;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 420px;
  @media (max-width: 1440px) {
    width: 90%;
  }
`;

const Block = styled.div`
  position: fixed;
  top: 80px;
  border: 1px solid #a49393;
  background: #ccafa5;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 80%;
  text-align: center;
  height: 380px;
  box-shadow: 0px 0px 10px 3px rgba(112, 100, 100, 0.3);
  @media (max-width: 1440px) {
    width: 90%;
  }
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

const Describe = styled.div`
  display: flex;
  position: absolute;
  right: 60px;
  top: 330px;
`;

const DescribeText = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const ColorG = styled(RiCheckboxBlankCircleFill)`
  font-size: 20px;
  color: #96baa9;
  margin: 0 2px;
`;
const ColorY = styled(ColorG)`
  color: #fcebcf;
`;

const Button = styled.button`
  position: fixed;
  top: 422px;
  display: flex;
  align-items: center;
  margin: 12px auto;
  padding: 0.5rem;
  background-color: #dcae96;
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid #dcae96;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  height: 50px;
  letter-spacing: 1px;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    transition-duration: 0.1s;
    background-color: #dba083;
    color: #fff;
  }
  :active {
    background-color: #a06043;
    box-shadow: 1px 2px #ccc;
    transform: translateY(3px);
    border: none;
  }
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  & > :first-child {
    border: 3px
      ${(props) => (props.isDraggingOver ? "solid #A47E84" : "solid #A47E84")};
    position: fixed;
    top: 200px;
    flex-wrap: wrap;
    overflow-x: scroll;
    width: 75%;
    height: 210px;
    padding: 8px;

    @media (max-width: 1440px) {
      width: 86%;
    }
  }
  & > :nth-child(2) {
    top: 400px;
  }
  & > :last-child {
    margin-bottom: 30px;
  }
`;

const IconColum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RemoveIcon = styled(CgPlayListRemove)`
  font-size: 50px;
  color: #ddd;
  cursor: pointer;
`;

const CountNumber = styled.div`
  font-size: 16px;
  margin-left: -4px;
  font-weight: 600;
  color: #b8ab9b;
`;

const TaskRow = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#FDFBF4" : "white")};
  display: flex;
  border: 3px solid #b8ab9b;
  border-radius: 16px;
  min-height: 7rem;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media (max-width: 1440px) {
    height: 90px;
    overflow-x: scroll;
  }
`;

const Task = styled.div`
  border: 3px solid #b8ab9b;
  border-radius: 50%;
  padding: 6px;
  margin: 8px;
  transition: background-color 0.2s ease;
  /* background-color: ${(props) => (props.isDragging ? "fff" : "white")}; */
  background-color: ${(props) => {
    switch (props.color) {
      case "veggie":
        return "#96BAA9";
      case "baby":
        return "#FCEBCF";
      default:
        return "FFF9F2";
    }
  }};

  border: 3px
    ${(props) => {
    switch (props.color) {
      case "veggie":
        return "solid #E9DDD4";
      case "baby":
        return "solid #e6d2c3";
      default:
        return "solid #EBBBB0";
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case "veggie":
        return "#F4FCF9";
      case "baby":
        return "#C48E75";
      default:
        return "#89605B";
    }
  }};
  -webkit-box-shadow: 5px 5px 6px -1px rgba(203, 175, 165, 0.6);
  box-shadow: 5px 5px 6px -1px rgba(203, 175, 165, 0.6);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;

const GuestName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
`;

function Table() {
  const [tables, setTables] = useState([]);
  const [veggie, setVeggie] = useState([]);
  const [baby, setBaby] = useState([]);
  const user = useSelector((state) => state.user);

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        let getSaveList = doc.data().guestlist;
        let saveList = JSON.parse(getSaveList);
        setTables(saveList);
        //console.log(saveList);
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .where("veggie", "==", "yes")
      .onSnapshot((querySnapshot) => {
        const getVeggie = [];
        querySnapshot.docs.forEach((doc) => {
          getVeggie.push(doc.data().id);
        });
        setVeggie(getVeggie);
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .where("baby", "==", "yes")
      .onSnapshot((querySnapshot) => {
        const getBaby = [];
        querySnapshot.docs.forEach((doc) => {
          getBaby.push(doc.data().id);
        });
        setBaby(getBaby);
      });
  }, []);

  function getColor(id) {
    if (veggie.includes(id)) {
      return "veggie";
    } else if (baby.includes(id)) {
      return "baby";
    }
  }

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
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      const reorder = Array.from(tables); //reorder=copy tables[]
      const theTable = reorder[Number(source.droppableId)]; //抓到tables[]裡的哪一張table[]

      const [changeSeat] = theTable.splice(source.index, 1); // 把table array的 source.index 跟 destination.index交換
      theTable.splice(destination.index, 0, changeSeat);

      reorder[Number(source.droppableId)] = theTable;

      setTables(reorder);
      updateHistory(reorder)
    }

    if (source.droppableId !== destination.droppableId) {
      const move = Array.from(tables); //result=copy tables[]
      const pickTable = move[Number(source.droppableId)]; //抓到tables[]裡的哪一張table[]
      const desTable = move[Number(destination.droppableId)];

      const [moveGuest] = pickTable.splice(source.index, 1);
      desTable.splice(destination.index, 0, moveGuest);

      move[Number(source.droppableId)] = pickTable;
      move[Number(destination.droppableId)] = desTable;
      setTables(move);
      updateHistory(move)
    }
  }

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    const rotate = "rotate(1turn)";
    const scale = "scale(1.2)";

    return {
      ...style,
      transform: `${translate} ${scale} ${rotate}`,
      transition: `all ${curve} ${duration + 0.4}s`,
    };
  }

  function removeTable(table, ind) {
    const afterDel = Array.from(tables);
    afterDel.splice(ind, 1);
    afterDel.splice(0, 1);
    const newList = [[...table, ...tables[0]], ...afterDel];
    setTables(newList);
    updateHistory(newList);
  }

  function addTable() {
    setTables([...tables, []]);
    const newTable = [...tables, []];
    updateHistory(newTable)
  }


  return (
    <>
      <Header />
      {tables !== undefined ? (
        <Bg>
          <Container>
            <DragDropContext onDragEnd={onDragEnd}>
              <Block>
                <BlockTitle>Seating Arrangement</BlockTitle>
                <BlockTitleSmall>
                  -Add tables to arrange your guests-
                </BlockTitleSmall>
                <Describe>
                  <DescribeText>
                    <ColorG /> Vegetarian
                  </DescribeText>
                  <DescribeText>
                    <ColorY /> Baby Seat
                  </DescribeText>
                </Describe>
              </Block>
              <Button type="button" onClick={addTable}>
                + Click to Add Table
              </Button>

              <TaskContainer>
                {tables.map((table, ind) => (
                  <Droppable
                    key={ind}
                    droppableId={`${ind}`}
                    direction="horizontal"
                  >
                    {(provided, snapshot) => (
                      <TaskRow
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        <>
                          {ind > 0 ? (
                            <IconColum>
                              <RemoveIcon
                                onClick={(e) => removeTable(table, ind)}
                              />
                              <CountNumber>{table.length}</CountNumber>
                            </IconColum>
                          ) : null}

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
                                  // isDragging={snapshot.isDragging}
                                  isDragging={
                                    snapshot.isDragging &&
                                    !snapshot.isDropAnimating
                                  }
                                  style={getStyle(
                                    provided.draggableProps.style,
                                    snapshot
                                  )}
                                  color={getColor(guest.id)}
                                >
                                  <GuestName>{guest.content}</GuestName>
                                </Task>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </>
                      </TaskRow>
                    )}
                  </Droppable>
                ))}
              </TaskContainer>
            </DragDropContext>
          </Container>
        </Bg>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Table;
