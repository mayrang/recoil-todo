import React, { useState } from "react";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, toDoAtom, toDoSelector } from "../atom/todo";
import ToDo from "./ToDo";
import { Categories, IToDo } from "../model/todo";
import AddCategory from "./AddCategory";

const Container = styled.div`
  max-width: 640px;
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

const AddCategoryButton = styled.button`
  color: ${(props) => props.theme.accentColor};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  margin-right: auto;
  border: none;
  background-color: inherit;
`;

const Hr = styled.hr`
  width: 100%;
`;

export default function ToDoList() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const todos = useRecoilValue(toDoAtom);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as Categories);
  };
  const onAddCategory = () => {
    setShowAddCategory((prev) => !prev);
  };
  return (
    <Container>
      <Title>To Do List</Title>
      <Hr />
      {showAddCategory ? (
        <AddCategory onShow={onAddCategory} />
      ) : (
        <AddCategoryButton onClick={onAddCategory}>+ Add Category</AddCategoryButton>
      )}
      <Select value={category} onInput={onInput}>
        {Object.keys(todos).map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>
      <Hr />
      <CreateToDo />
      <TodoList>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoList>
    </Container>
  );
}
