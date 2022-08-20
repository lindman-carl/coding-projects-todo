import React from "react";

// types
import { TodoItemType } from "../types/todoTypes";

type TodoItemProps = {
  item: TodoItemType;
  handleToggle: any;
};

const TodoItem = ({ item, handleToggle }: TodoItemProps) => {
  const { title, done } = item;
  return (
    <button className="todo-item-container" onClick={() => handleToggle(item)}>
      <div className="w-6 h-6 rounded-md border-2 border-theme-primary shadow"></div>
      <div className="font-medium text-lg">
        {title} - {done ? "Done" : "Not done"}
      </div>
    </button>
  );
};

export default TodoItem;
