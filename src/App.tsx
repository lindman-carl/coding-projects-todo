import React, { ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoPlus } from "react-icons/go";

// components
import Header from "./components/Header";
import TodoList from "./components/TodoList";

import { auth, logInWithGoogle } from "./services/firebaseAuthentication";
import { addTodo, getTodoItemsByUserId } from "./services/firebaseLogic";
import { TodoItemType } from "./types/todoTypes";

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
  const [todoItems, setTodoItems] = useState<TodoItemType[] | undefined>();
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (!loading && user) {
        const items = await getTodoItemsByUserId(user?.uid);

        console.log(items);
        setTodoItems(items);
        setFetching(false);
      }
    };

    getData();
  }, [user, loading]);

  return (
    <div className="app-container">
      <Header> {!loading && user && <AddTodo uid={user.uid} />}</Header>
      <ContentContainer>
        {!loading && user ? (
          <TodoList fetching={fetching} todoItems={todoItems} />
        ) : (
          <button onClick={logInWithGoogle}>Login</button>
        )}
      </ContentContainer>
    </div>
  );
};

export default App;
