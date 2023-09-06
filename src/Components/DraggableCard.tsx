import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DraggableCard({ toDo, index }: { toDo: string; index: number }) {
  console.log(toDo, "rerendering");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
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
const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #fff;
  margin-bottom: 5px;
`;
export default React.memo(DraggableCard);
