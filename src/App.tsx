import React from "react";

const Header = () => {
  return (
    <div className="header-container">
      <div className="text-3xl font-bold">TODO APP</div>
    </div>
  );
};

const TodoList = () => {
  return (
    <div className="todo-list-container">
      <div>Todos</div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
