import React, { ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoPlus } from "react-icons/go";

// components
import Header from "./components/Header";
import TodoList from "./components/TodoList";

import { auth, logInWithGoogle } from "./services/firebaseAuthentication";
import {
  addTodo,
  getTodoItemsByUserId,
  toggleDoneTodo,
} from "./services/firebaseLogic";
import { TodoItemType } from "./types/todoTypes";
import { sortTodoItems } from "./utils";

type ContentContainerProps = {
  children: ReactNode | ReactNode[];
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="content-container">{children}</div>;
};

type AddTodoProps = {
  uid: string;
};

const AddTodo = ({ uid }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // add todo to firestore
    const newTodo = await addTodo(uid, title);
    console.log("new todo:", newTodo);

    // clear input
    setTitle("");
  };

  return (
    <form className="add-todo-container" onSubmit={handleSubmit}>
      <div className="w-full flex justify-start items-center border-b-2">
        <GoPlus />
        <input
          className="w-full bg-theme-primary outline-none font-medium text-lg px-2"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder={"Add task"}
        />
      </div>
      <button className="bg-theme-secondary px-8 py-2 rounded font-medium text-lg shadow">
        Add
      </button>
    </form>
  );
};

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [todoItems, setTodoItems] = useState<TodoItemType[] | []>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (!loading && user) {
        const items = await getTodoItemsByUserId(user?.uid);
        const sortedItems = sortTodoItems(items);
        console.log("fetched items:", sortedItems);
        setTodoItems(sortedItems);
        setFetching(false);
      }
    };

    getData();
  }, [user, loading]);

  const handleToggle = async (todoItem: TodoItemType) => {
    const toggledTodo = await toggleDoneTodo(todoItem);
    console.log("ttt", toggledTodo);

    if (toggledTodo === null) {
      return;
    }

    // update todoItems
    const filteredTodos = todoItems?.filter(
      (todo) => todo.id !== toggledTodo.id
    );

    const newTodoItems = [...filteredTodos, toggledTodo];
    console.log(newTodoItems);
    const sortedTodoItems = sortTodoItems(newTodoItems);

    // set totoItems
    setTodoItems(sortedTodoItems);
  };

  return (
    <div className="app-container">
      <Header> {!loading && user && <AddTodo uid={user.uid} />}</Header>
      <ContentContainer>
        {!loading && user ? (
          <TodoList
            fetching={fetching}
            todoItems={todoItems}
            handleToggle={handleToggle}
          />
        ) : (
          <button onClick={logInWithGoogle}>Login</button>
        )}
      </ContentContainer>
    </div>
  );
};

export default App;
