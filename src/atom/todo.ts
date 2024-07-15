import { atom } from "recoil";
import { IToDo } from "../model/todo";

export const toDoAtom = atom<IToDo[]>({
  key: "todo",
  default: [],
});
