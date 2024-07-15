import { atom, selector } from "recoil";
import { Categories, IToDo } from "../model/todo";

export const toDoAtom = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const categoryAtom = atom<Categories>({
  key: "todo_category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "todo_selector",
  get: ({ get }) => {
    const category = get(categoryAtom);
    const todos = get(toDoAtom);
    return todos.filter((todo) => todo.category === category);
  },
});
