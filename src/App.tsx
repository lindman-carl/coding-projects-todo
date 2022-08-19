import React, { ReactNode } from "react";

// components
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";

// types
import { TodoItemType } from "./todoTypes";

const todoItem: TodoItemType = {
  title: "Clean the kitchen",
  uid: "lkjadlkj0192i3",
  done: false,
  archived: false,
};

type ContentContainerProps = {
  children: ReactNode | ReactNode[];
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="content-container">{children}</div>;
};

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <ContentContainer>
        <TodoList>
          <TodoItem item={todoItem} />
          <TodoItem item={todoItem} />
          <TodoItem item={todoItem} />
          <TodoItem item={todoItem} />
          <TodoItem item={todoItem} />
          <TodoItem item={todoItem} />
        </TodoList>
      </ContentContainer>
    </div>
  );
};

export default App;
