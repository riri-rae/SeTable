import React from "react";
// import styled from "styled-components";
import "@atlaskit/css-reset";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import "./style.css";

function App2() {
  const [items, setItems] = React.useState({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
    ],
    left2: [
      { id: 6, name: "Richard" },
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      // { id: 11, name: "H1" },
      // { id: 12, name: "H2" },
      // { id: 13, name: "H3" },
      // { id: 14, name: "H4" },
      // { id: 15, name: "H5" },
    ],
    left3: [],
    // left4: [],
    right: [
      { id: 16, name: "王小明" },
      { id: 17, name: "ben" },
      { id: 18, name: "joe" },
      { id: 19, name: "jason" },
      { id: 20, name: "chris" },
      { id: 21, name: "heather" },
      { id: 22, name: "Richard" },
      { id: 23, name: "george" },
      { id: 24, name: "rupert" },
      { id: 25, name: "alice" },
      { id: 26, name: "katherine" },
      { id: 27, name: "H6" },
      { id: 28, name: "ben" },
      { id: 29, name: "joe" },
      { id: 30, name: "jason" },
    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className="container">
        <GridDropZone
          className="dropzone left"
          id="left"
          boxesPerRow={10}
          rowHeight={70}
        >
          {items.left.map((item) => (
            <GridItem key={item.id}>
              <div className="grid-item">
                <div className="grid-item-content">{item.name}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone
          className="dropzone left left2"
          id="left2"
          boxesPerRow={10}
          rowHeight={70}
        >
          {items.left2.map((item) => (
            <GridItem key={item.id}>
              <div className="grid-item">
                <div className="grid-item-content">{item.name}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
        {/* <GridDropZone
          className="dropzone left left3"
          id="left3"
          boxesPerRow={10}
          rowHeight={70}
        >
          {items.left3.map((item) => (
            <GridItem key={item.id}>
              <div className="grid-item">
                <div className="grid-item-content">{item.name}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone> */}

        <GridDropZone
          className="dropzone right"
          id="right"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.right.map((item) => (
            <GridItem key={item.id}>
              <div className="grid-item">
                <div className="grid-item-content">{item.name}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App2;
