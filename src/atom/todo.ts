import { atom, selector } from "recoil";
import { Categories, ICategoryToDo, IToDo } from "../model/todo";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-todo",
  storage: localStorage,
});

export const toDoAtom = atom<ICategoryToDo>({
  key: "todo",
  default: {
    TO_DO: [],
    DOING: [],
    DONE: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const categoryAtom = atom<Categories | string>({
  key: "todo_category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "todo_selector",
  get: ({ get }) => {
    const category = get(categoryAtom);
    const todos = get(toDoAtom);
    const currentCategory = Object.keys(todos).find((item) => item === category);
    if (!currentCategory) {
      return [];
    }
    return todos[currentCategory];
  },
});
