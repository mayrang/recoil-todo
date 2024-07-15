import React from "react";
import { IToDo } from "../model/todo";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { toDoAtom } from "../atom/todo";

const ToDoItem = styled.li`
  padding: 4px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.accentColor};
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  padding: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Text = styled.span`
  flex: 1;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: none;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
`;

export default function ToDo({ text, category, id }: IToDo) {
  const setTodos = useSetRecoilState(toDoAtom);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setTodos((prev) => {
      const targetIndex = prev.findIndex((item) => item.id === id);
      const newTodo = { text, id, category: name as any };
      return [...prev.slice(0, targetIndex), newTodo, ...prev.slice(targetIndex + 1)];
    });
  };
  return (
    <ToDoItem>
      <Text>{text}</Text>
      {category !== "TO_DO" && (
        <Button name="TO_DO" onClick={onClick}>
          To Do
        </Button>
      )}
      {category !== "DOING" && (
        <Button name="DOING" onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== "DONE" && (
        <Button name="DONE" onClick={onClick}>
          Done
        </Button>
      )}
    </ToDoItem>
  );
}
