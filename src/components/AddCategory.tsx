import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, toDoAtom } from "../atom/todo";

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
  cursor: pointer;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
`;

interface IForm {
  newCategory: string;
}

export default function AddCategory({ onShow }: { onShow: () => void }) {
  const setCategory = useSetRecoilState(categoryAtom);
  const setTodos = useSetRecoilState(toDoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ newCategory }: IForm) => {
    setCategory(newCategory);
    setTodos((prev) => ({
      ...prev,
      [newCategory]: [],
    }));
    setValue("newCategory", "");
    onShow();
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input {...register("newCategory", { required: "Please Write New Category" })} placeholder="Write New Category" />
      <Button>Add</Button>
      <Button onClick={onShow}>X</Button>
    </Form>
  );
}
