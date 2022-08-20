import React from "react";
import { BsCheckLg } from "react-icons/bs";

// types
import { TodoItemType } from "../types/todoTypes";

type CheckmarkProps = {
  checked: boolean;
};

const Checkmark = ({ checked }: CheckmarkProps) => {
  if (checked) {
    return (
      <div className="w-6 h-6 flex justify-center items-center bg-theme-light rounded-md border-2 border-theme-primary">
        <BsCheckLg className="text-theme-primary mt-[2px]" />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-md border-2 border-theme-primary"></div>
  );
};

type TodoItemProps = {
  item: TodoItemType;
  handleToggle: any;
};

const TodoItem = ({ item, handleToggle }: TodoItemProps) => {
  const { title, done } = item;
  return (
    <button className="todo-item-container" onClick={() => handleToggle(item)}>
      <Checkmark checked={done} />
      {done ? (
        <div className="font-medium text-lg text-slate-400 line-through">
          {title}
        </div>
      ) : (
        <div className="font-medium text-lg">{title}</div>
      )}
    </button>
  );
};

export default TodoItem;
