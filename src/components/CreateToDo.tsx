import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, toDoAtom } from "../atom/todo";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 6px;

  padding: 12px 0 24px;
`;

const Input = styled.input`
  padding: 6px 4px;
  font-size: 18px;
  flex: 1;
  border-radius: 6px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: none;
  border: none;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

export default function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryAtom);
  const setTodos = useSetRecoilState(toDoAtom);
  const handleValid = ({ toDo }: IForm) => {
    setTodos((prev) => ({ ...prev, [category]: [{ text: toDo, id: Date.now() }, ...prev[category]] }));
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input placeholder="Write To Do" {...register("toDo", { required: "Please Write To Do" })} />
      <Button>Add</Button>
    </Form>
  );
}
