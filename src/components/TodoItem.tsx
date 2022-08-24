import React, { useState } from "react";
import { BsCheckLg, BsThreeDots } from "react-icons/bs";

// types
import { TodoItemType } from "../types/todoTypes";

type CheckmarkProps = {
  checked: boolean;
};

const Checkmark = ({ checked }: CheckmarkProps) => {
  if (checked) {
    return (
      <div className="w-6 h-6 min-w-[1.5rem] flex justify-center items-center bg-theme-light rounded-md border-2 border-theme-primary">
        <BsCheckLg className="text-theme-primary mt-[2px]" />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 min-w-[1.5rem] rounded-md border-2 border-theme-primary"></div>
  );
};

type TodoItemProps = {
  item: TodoItemType;
  handleToggle: any;
  handleDelete: any;
};

const TodoItem = ({ item, handleToggle, handleDelete }: TodoItemProps) => {
  const [optionsExpanded, setOptionsExpanded] = useState<boolean>(false);

  const { title, done } = item;
  return (
    <div className="todo-item-container">
      <button
        onClick={() => handleToggle(item)}
        className="flex flex-row flex-grow justify-start gap-x-8 active:underline"
      >
        <Checkmark checked={done} />
        {done ? (
          <div className="font-medium text-md text-slate-400 line-through">
            {title}
          </div>
        ) : (
          <div className="font-medium text-md">{title}</div>
        )}
      </button>
      <div className="inline-flex">
        <button
          className="text-theme-primary ml-auto active:scale-125 sm:hover:scale-125 transition-transform"
          onClick={() => setOptionsExpanded((prev) => !prev)}
        >
          <BsThreeDots
            className={optionsExpanded ? "rotate-90 transition-transform" : ""}
          />
        </button>
        {optionsExpanded && (
          <div className="px-2">
            <button
              className="delete-button"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
