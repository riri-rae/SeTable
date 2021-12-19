import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "firebase/firestore";
import styled from "styled-components";
import Header from "./components/Header";
import Loading from "./components/Loading";
import {
  updateHistory,
  setHistory,
  getVeggie,
  getBaby,
} from "./utils/firebaseFunction";
import { AddTableButton } from "./components/style/generalStyle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CgPlayListRemove } from "react-icons/cg";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

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
    width: 95%;
  }
  @media (max-width: 768px) {
    padding-top: 330px;
  }
  @media (max-width: 425px) {
    width: 100%;
    padding-top: 324px;
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
    width: 95%;
  }
  @media (max-width: 768px) {
    top: 100px;
    height: 295px;
  }
  @media (max-width: 425px) {
    width: 100%;
    height: 300px;
  }
  @media (max-width: 425px) {
    height: 290px;
  }
`;

const BlockTitle = styled.div`
  color: #fff;
  font-size: 36px;
  margin-top: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 30px;
    margin-top: 10px;
  }
  @media (max-width: 425px) {
    font-size: 28px;
    margin-top: 4px;
  }
`;

const BlockTitleSmall = styled(BlockTitle)`
  margin-top: 8px;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 4px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Describe = styled.div`
  display: flex;
  position: absolute;
  right: 60px;
  top: 330px;
  @media (max-width: 768px) {
    right: 30px;
    top: 260px;
  }
  @media (max-width: 425px) {
    left: 50%;
    top: 250px;
    transform: translate(-50%);
  }
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
  @media (max-width: 425px) {
    font-size: 14px;
    margin: 0 4px;
  }
`;
const ColorY = styled(ColorG)`
  color: #fcebcf;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 4px;
  & > :first-child {
    border: 3px
      ${(props) => (props.isDraggingOver ? "solid #A47E84" : "solid #A47E84")};
    position: fixed;
    top: 200px;
    flex-wrap: wrap;
    width: 75%;
    height: 210px;
    padding: 8px;

    @media (max-width: 1440px) {
      width: 86%;
    }
    @media (max-width: 768px) {
      top: 190px;
      width: 90%;
      height: 166px;
    }
    @media (max-width: 425px) {
      top: 180px;
      width: 95%;
      height: 166px;
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
  @media (max-width: 768px) {
    font-size: 40px;
  }
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
  height: 7rem;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30%;
    border: none;
    margin: 8px 0;

  }
  ::-webkit-scrollbar-thumb {
    background: rgba(137, 96, 91, 0.3);
    border-radius: 30px;
    border: none;
  }
  
  @media (max-width: 768px) {
    height: 6rem;
  }
  @media (max-width: 768px) {
    height: 5.6rem;
  }
`;

const Task = styled.div`
  border: 3px solid #b8ab9b;
  border-radius: 50%;
  padding: 4px;
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
  box-shadow: 5px 5px 6px -1px rgba(203, 175, 165, 0.6);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
    width: 56px;
    height: 56px;
    padding: 2px;
    margin: 4px;
    justify-content: space-evenly;
  }
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

  useEffect(() => {
    const unsubscribe = setHistory(user.uid, setTables);
    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = getVeggie(user.uid, setVeggie);
    return () => unsubscribe();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = getBaby(user.uid, setBaby);
    return () => unsubscribe();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
      const reorder = Array.from(tables);
      const theTable = reorder[Number(source.droppableId)];

      const [changeSeat] = theTable.splice(source.index, 1);
      theTable.splice(destination.index, 0, changeSeat);

      reorder[Number(source.droppableId)] = theTable;

      setTables(reorder);
      updateHistory(user.uid, reorder);
    }

    if (source.droppableId !== destination.droppableId) {
      const move = Array.from(tables);
      const pickTable = move[Number(source.droppableId)];
      const desTable = move[Number(destination.droppableId)];

      const [moveGuest] = pickTable.splice(source.index, 1);
      desTable.splice(destination.index, 0, moveGuest);

      move[Number(source.droppableId)] = pickTable;
      move[Number(destination.droppableId)] = desTable;
      setTables(move);
      updateHistory(user.uid, move);
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
    updateHistory(user.uid, newList);
  }

  function addTable() {
    setTables([...tables, []]);
    const newTable = [...tables, []];
    updateHistory(user.uid, newTable);
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
              <AddTableButton type="button" onClick={addTable}>
                + Click to Add Table
              </AddTableButton>

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
