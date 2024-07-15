export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
