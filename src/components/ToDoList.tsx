import React from "react";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, toDoAtom, toDoSelector } from "../atom/todo";
import ToDo from "./ToDo";
import { Categories, IToDo } from "../model/todo";

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

const Select = styled.select`
  padding: 6px;
  margin: 10px 0;
  width: 100%;
  border-radius: 6px;
  border: none;
  outline: none;
`;

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as Categories);
  };
  return (
    <Container>
      <Title>To Do List</Title>
      <hr />
      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <CreateToDo />
      <TodoList>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoList>
    </Container>
  );
}
