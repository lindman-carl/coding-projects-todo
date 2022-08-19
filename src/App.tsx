import React from "react";

// components
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";

// types
import { TodoItemType } from "./todoTypes";

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
