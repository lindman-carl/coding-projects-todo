import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import AddTodo from "./components/AddTodo";
import ContentContainer from "./components/ContentContainer";
import Header from "./components/Header";
import SignatureFooter from "./components/SignatureFooter";
import TodoList from "./components/TodoList";

// services
import {
  auth,
  logInWithGoogle,
  logout,
} from "./services/firebaseAuthentication";
import {
  addTodo,
  getTodoItemsByUserId,
  toggleDoneTodo,
} from "./services/firebaseLogic";

// types
import { TodoItemType } from "./types/todoTypes";

// utils
import { sortTodoItems } from "./utils";

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [todoItems, setTodoItems] = useState<TodoItemType[] | []>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (title.length < 1) {
      return;
    }

    // add todo to firestore
    const newTodo = await addTodo(user.uid, title);
    console.log("new todo:", newTodo);

    if (!newTodo) {
      return;
    }

    // update todoItems
    const newTodoItems = [...todoItems, newTodo];
    console.log(newTodoItems);
    const sortedTodoItems = sortTodoItems(newTodoItems);

    // set totoItems
    setTodoItems(sortedTodoItems);

    // clear input
    setTitle("");
  };

  const handleToggle = async (todoItem: TodoItemType) => {
    const toggledTodo = await toggleDoneTodo(todoItem);

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
      <Header>
        <div className="w-full grid grid-cols-6">
          <div className="col-start-2 col-span-4 text-center text-3xl font-bold drop-shadow-lg">
            Todo Meister
          </div>
          <div className="col-span-1 flex flex-row justify-end">
            {!loading && user?.photoURL ? (
              <button onClick={logout}>
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-lg shadow "
                />
              </button>
            ) : (
              <button onClick={logInWithGoogle}>Login</button>
            )}
          </div>
        </div>
        {!loading && user && (
          <AddTodo
            title={title}
            setTitle={setTitle}
            handleSubmit={handleSubmit}
          />
        )}
      </Header>
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
      <SignatureFooter />
    </div>
  );
};

export default App;
