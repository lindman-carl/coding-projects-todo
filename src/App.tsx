import React, { ReactNode } from "react";

const Header = () => {
  return (
    <div className="header-container">
      <div className="text-3xl font-bold drop-shadow-lg">TODO APP</div>
    </div>
  );
};

type TodoListProps = {
  children: ReactNode | ReactNode[];
};

const TodoList = ({ children }: TodoListProps) => {
  return <div className="todo-list-container">{children}</div>;
};

type TodoItemType = {
  title: string;
  id: string;
  done: boolean;
  archived: boolean;
};

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

const todoItem: TodoItemType = {
  title: "Clean the kitchen",
  id: "lkjadlkj0192i3",
  done: false,
  archived: false,
};

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <TodoList>
        <TodoItem item={todoItem} />
        <TodoItem item={todoItem} />
        <TodoItem item={todoItem} />
        <TodoItem item={todoItem} />
        <TodoItem item={todoItem} />
        <TodoItem item={todoItem} />
      </TodoList>
    </div>
  );
};

export default App;
