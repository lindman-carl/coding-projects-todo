import React, { ReactNode } from "react";

type TodoListProps = {
  children: ReactNode | ReactNode[];
};

const TodoList = ({ children }: TodoListProps) => {
  return <div className="todo-list-container">{children}</div>;
};

export default TodoList;
