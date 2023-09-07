import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DraggableCard({ toDo, index }: { toDo: string; index: number }) {
  console.log(toDo, "rerendering");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? "tomato" : "white")};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;
export default React.memo(DraggableCard);
