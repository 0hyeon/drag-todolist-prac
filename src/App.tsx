import React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 100px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  // 수정까지 하고싶다면 useRecoilState함수
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (Info: DropResult) => {
    console.log(Info);
    const { destination, draggableId, source } = Info;
    if (!destination) return;
    //같은보드라면,
    if (destination?.droppableId === source.droppableId) {
      //oldToDos 참고
      // let oldToDos: {
      //   key: "toDo";
      //   default: {
      //     "To Do": ["a", "b"];
      //     Doing: ["c", "d", "e"];
      //     Done: ["f"];
      //   }
      // };

      setTodos((allboards) => {
        const boardCopy = [...allboards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allboards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    //다른보드이면?
    if (destination?.droppableId !== source.droppableId) {
      setTodos((allboards) => {
        const sourceBoard = [...allboards[source.droppableId]];
        const destinationBoard = [...allboards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allboards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

    //단일보드일때
    // default: ["a", "b", "c", "d", "e", "f", "g", "h"],
    // if (!destination) return;
    // setTodos((prev) => {
    //   const todosCopy = [...prev];
    //   todosCopy.splice(source.index, 1);
    //   todosCopy.splice(destination?.index, 0, draggableId);
    //   return todosCopy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
