import React from "react";
import { Categories, IToDo } from "../model/todo";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryAtom, toDoAtom } from "../atom/todo";

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

export default function ToDo({ text, id }: IToDo) {
  const category = useRecoilValue(categoryAtom);
  const [todos, setTodos] = useRecoilState(toDoAtom);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setTodos((prev) => {
      const prevCategory = Object.keys(prev).find((item) => item === category);
      if (!prevCategory) {
        return prev;
      }

      return {
        ...prev,
        [prevCategory]: prev[prevCategory].filter((item) => item.id !== id),
        [name]: [{ id, text }, ...prev[name]],
      };
    });
  };
  const onDelete = () => {
    setTodos((prev) => {
      const currentCategory = Object.keys(prev).find((item) => item === category);
      if (!currentCategory) {
        return prev;
      }
      return {
        ...prev,
        [currentCategory]: prev[currentCategory].filter((item: IToDo) => item.id !== id),
      };
    });
  };
  return (
    <ToDoItem>
      <Text>{text}</Text>
      {Object.keys(todos).map((item) => (
        <>
          {item !== category && (
            <Button name={item} onClick={onClick}>
              {item}
            </Button>
          )}
        </>
      ))}

      <Button onClick={onDelete}>X</Button>
    </ToDoItem>
  );
}
