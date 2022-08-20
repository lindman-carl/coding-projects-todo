import { TodoItemType } from "./types/todoTypes";

export const sortTodoItems = (todoItems: TodoItemType[]) => {
  const sorted = todoItems.sort((a, z) => {
    // sort by done and then title
    return Number(a.done) - Number(z.done) || a.title.localeCompare(z.title);
  });

  return sorted;
};
