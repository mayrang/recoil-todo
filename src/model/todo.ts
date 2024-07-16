export interface IToDo {
  text: string;
  id: number;
}

export interface ICategoryToDo {
  [key: string | Categories]: IToDo[];
}

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
