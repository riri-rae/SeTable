// import React from 'react';
// import '@atlaskit/css-reset';
// import { DragDropContext } from 'react-beautiful-dnd';
// import initialData from './initial-data';
// import Column from './column';
// import styled from 'styled-components';


// const Container = styled.div`
//   display: flex;
// `;

// class App extends React.Component {
//   state = initialData;


//   onDragEnd = result => {
//     const { destination, source, draggableId } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const start = this.state.columns[source.droppableId];
//     const finish = this.state.columns[destination.droppableId];

//     if (start === finish) {
//       const newTaskIds = Array.from(start.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...start,
//         taskIds: newTaskIds,
//       };

//       const newState = {
//         ...this.state,
//         columns: {
//           ...this.state.columns,
//           [newColumn.id]: newColumn,
//         },
//       };

//       this.setState(newState);
//       return;
//     }


//     const startTaskIds = Array.from(start.taskIds);
//     startTaskIds.splice(source.index, 1);
//     const newStart = {
//       ...start,
//       taskIds: startTaskIds,
//     };

//     const finishTaskIds = Array.from(finish.taskIds);
//     finishTaskIds.splice(destination.index, 0, draggableId);
//     const newFinish = {
//       ...finish,
//       taskIds: finishTaskIds,
//     };

//     const newState = {
//       ...this.state,
//       columns: {
//         ...this.state.columns,
//         [newStart.id]: newStart,
//         [newFinish.id]: newFinish,
//       },
//     };
//     this.setState(newState);
//   };


//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Container>
//           {this.state.columnOrder.map(columnId => {
//             const column = this.state.columns[columnId];
//             const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

//             return <Column key={column.id} column={column} tasks={tasks} />;
//           })}
//         </Container>
//       </DragDropContext>

//     );
//   }
// }

import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Table from "./table";
import App3 from "./app3-function";
import Header from "./components/header";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        {/* <Route path="/table" component={Table} /> */}
        <Route path="/table" component={App3} />
        {/* <Route path="/login" component={Login} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

