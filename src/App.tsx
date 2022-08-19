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
  return (
    <div className="todo-list-container">
      <div>{children}</div>
    </div>
  );
};

enum TodoStatus {
  Active = "Activec",
  Done = "Done",
  Archived = "Archived",
}

type TodoItemType = {
  title: string;
  description: string;
  id: string;
  status: TodoStatus;
};

type TodoItemProps = {
  item: TodoItemType;
};

const TodoItem = ({ item }: TodoItemProps) => {
  const { title, description, status } = item;
  return (
    <div className="todo-item-container">
      {title} - {description} - {status}
    </div>
  );
};

const todoItem: TodoItemType = {
  title: "Clean the kitchen",
  description: "Clean that motherfucker",
  id: "lkjadlkj0192i3",
  status: TodoStatus.Archived,
};

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <TodoList>
        <TodoItem item={todoItem} />
      </TodoList>
    </div>
  );
};

export default App;
