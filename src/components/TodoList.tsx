import React from "react";
import { ClipLoader } from "react-spinners";

import { TodoItemType } from "../types/todoTypes";
import TodoItem from "./TodoItem";

type TodoListProps = {
  // children: ReactNode | ReactNode[];
  fetching: boolean;
  todoItems?: TodoItemType[];
};

const TodoList = ({ fetching, todoItems }: TodoListProps) => {
  return (
    <div className="todo-list-container">
      {fetching ? (
        <ClipLoader className="my-8" color={"#3d5a80"} />
      ) : (
        todoItems?.map((item) => <TodoItem item={item} key={item.id} />)
      )}
    </div>
  );
};

export default TodoList;
