import React from "react";

// types
import { TodoItemType } from "../todoTypes";

type TodoItemProps = {
  item: TodoItemType;
};

const TodoItem = ({ item }: TodoItemProps) => {
  const { title } = item;
  return (
    <button className="todo-item-container">
      <div className="w-6 h-6 rounded-md border-2 border-theme-primary shadow"></div>
      <div className="font-medium text-lg">{title}</div>
    </button>
  );
};

export default TodoItem;
