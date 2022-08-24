import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

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
  deleteTodo,
  getTodoItemsByUserId,
  toggleDoneTodo,
} from "./services/firebaseLogic";

// types
import { TodoItemType } from "./types/todoTypes";

// utils
import { sortTodoItems } from "./utils";

// css
import "react-toastify/dist/ReactToastify.css";

const basicToast: ToastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

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

        // set state
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

    if (!newTodo) {
      return;
    }

    // update todoItems
    const newTodoItems = [...todoItems, newTodo];
    const sortedTodoItems = sortTodoItems(newTodoItems);

    // set totoItems
    setTodoItems(sortedTodoItems);

    // clear input
    setTitle("");

    // notify user with toast
    toast.success(`Task "${newTodo.title}" added successfully`, basicToast);
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
    const sortedTodoItems = sortTodoItems(newTodoItems);

    // set totoItems
    setTodoItems(sortedTodoItems);
  };

  const handleDelete = async (todoItem: TodoItemType) => {
    // show loading bar
    // maybe remove this. The problem is that it is not that quick
    // or that it could remove one locally but not on the server
    setFetching(true);

    // delete todo
    const deletedTodo = await deleteTodo(todoItem);

    // if failure
    if (deletedTodo === null) {
      setFetching(false);
      return;
    }

    // update todoItems
    const filteredTodos = todoItems?.filter(
      (todo) => todo.id !== deletedTodo.id
    );

    // no need to sort
    setTodoItems(filteredTodos);
    setFetching(false);
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
              <button
                onClick={() => {
                  setTodoItems([]);
                  logout();
                }}
              >
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
            handleDelete={handleDelete}
          />
        ) : (
          <button onClick={logInWithGoogle}>Login</button>
        )}
      </ContentContainer>
      <SignatureFooter />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
