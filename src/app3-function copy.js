import React, { useState } from "react";
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, offset = 1) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const Container = styled.div`
    margin-right: 2.5rem;
    margin-left: 2.5rem;
    position: relative;
    min-height: 100vh;
`;


const BlockWrap = styled.div`
    margin-right: 2.5rem;
    margin-left: 2.5rem;
    position: relative;
    height: 50vh;
`;

const Block = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #B8AB9B;
    width: 50%;
    text-align: center;
`;
const BlockTitle = styled.div`
    color: #574E56;
    font-size: 2rem;
    margin: 16px 0;
    
`;
const TaskContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;


const TaskRow = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  display: flex;
  border: 3px solid #ccc;
  min-height: 4rem;
`;

const Task = styled.div`
  border: 2px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const KioskContainer = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'solid lightblue' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 5px;
    flex: 0 0 150px;
    font-family: sans-serif;
    display: flex;
    position: fixed;
    top: 270px;
    /* bottom:1vh; */
    right: 8px;
    width: 160px;
    margin-right:2.5rem;
    flex-wrap:wrap;
    overflow:scroll;
`;

const KioskItems = styled.div`
    border: 2px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

`;




function App3() {
    const [state, setState] = useState([getItems(12)]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>

            <BlockWrap>
                <Block>
                    <BlockTitle>Arrange your table here!</BlockTitle>
                    <button
                        type="button"
                        onClick={() => {
                            setState([...state, []]);
                        }}
                    >
                        Add Table
                    </button>
                </Block>
            </BlockWrap>

            {state.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                        <KioskContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {el.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <KioskItems
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                        >
                                            {item.content}
                                        </KioskItems>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </KioskContainer>
                    )}
                </Droppable>
            ))}


            <TaskContainer>
                {state.map((el, ind) => (
                    <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
                        {(provided, snapshot) => (
                            <TaskRow
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {el.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
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
                    </Droppable>

                ))}
            </TaskContainer>


        </DragDropContext>
    );
}

export default App3;
