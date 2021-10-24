import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Content = styled.div`
    margin-right: 12rem;
    margin-left: 0.5rem;
`;

const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    /* margin: 0 0 0.5rem 0; */
    margin:4px;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    /* border-radius: 10px; */
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'solid lightblue' : 'solid #ddd')};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'solid lightblue' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
    display: flex;

`;

const Kiosk = styled(List)`
    position: absolute;
    top: 58px;
    right: 0;
    /* bottom: 58px; */
    width: 160px;
    margin-right:16px;
    display: flex;
    flex-wrap:wrap;
    overflow:scroll;
    height:85vh;
`;

const Container = styled(List)`
    margin: 0.5rem 0.5rem 1.5rem;
    min-height: 5rem;
    overflow: hidden;
    
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #000;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
`;

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const ITEMS = [
    {
        id: uuid(),
        content: 'Headline'
    },
    {
        id: uuid(),
        content: 'Copy'
    },
    {
        id: uuid(),
        content: 'Image'
    },
    {
        id: uuid(),
        content: 'Slideshow'
    },
    {
        id: uuid(),
        content: 'Quote'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '陳小美'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '陳小美'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '陳小美'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '陳小美'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    },
    {
        id: uuid(),
        content: '王小明'
    }

];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

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

class App3 extends Component {
    state = {
        [uuid()]: []
    };
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    addList = e => {
        this.setState({ [uuid()]: [] });
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="ITEMS" isDropDisabled={true} >
                    {(provided, snapshot) => (
                        <Kiosk
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }
                                            >
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Kiosk>
                    )}
                </Droppable>
                <Content>
                    <Button onClick={this.addList}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                        </svg>
                        <ButtonText>Add Table</ButtonText>
                    </Button>
                    {Object.keys(this.state).map((list, i) => (
                        <Droppable key={list} droppableId={list} direction='horizontal'>
                            {(provided, snapshot) => (
                                <Container
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    {this.state[list].length
                                        ? this.state[list].map(
                                            (item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <Item
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            isDragging={
                                                                snapshot.isDragging
                                                            }
                                                        >
                                                            {item.content}
                                                        </Item>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                        : !provided.placeholder && (
                                            <Notice>Drop items here</Notice>
                                        )}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    ))}
                </Content>
            </DragDropContext>
        );
    }
}

// Put the things into the DOM!
// ReactDOM.render(<App />, document.getElementById('root'));

export default App3;
