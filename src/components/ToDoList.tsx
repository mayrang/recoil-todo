import React from "react";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { useRecoilValue } from "recoil";
import { toDoAtom } from "../atom/todo";
import ToDo from "./ToDo";

const Container = styled.div`
  max-width: 480px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  padding: 64px 12px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 32px 0;
  color: ${(props) => props.theme.accentColor};
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export default function ToDoList() {
  const toDos = useRecoilValue(toDoAtom);

  return (
    <Container>
      <Title>To Do List</Title>
      <CreateToDo />
      <TodoList>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoList>
    </Container>
  );
}
