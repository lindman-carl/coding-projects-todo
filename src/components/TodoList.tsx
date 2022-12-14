import React from "react";
import { ClipLoader } from "react-spinners";

import { TodoItemType } from "../types/todoTypes";
import TodoItem from "./TodoItem";

type TodoListProps = {
  // children: ReactNode | ReactNode[];
  fetching: boolean;
  todoItems?: TodoItemType[];
  handleToggle: any;
  handleDelete: any;
};

const TodoList = ({
  fetching,
  todoItems,
  handleToggle,
  handleDelete,
}: TodoListProps) => {
  return (
    <div className="todo-list-container">
      {fetching ? (
        <ClipLoader className="my-8" color={"#3d5a80"} />
      ) : todoItems ? (
        todoItems.map((item) => (
          <TodoItem
            item={item}
            key={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <div>Add a task</div>
      )}
    </div>
  );
};

export default TodoList;
