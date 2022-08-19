import React, { ReactNode, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

// components
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import { getTodoItemsByUserId } from "./services/firebaseLogic";

// types
import { TodoItemType } from "./types/todoTypes";

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
  const [todoItems, setTodoItems] = useState<TodoItemType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const items = await getTodoItemsByUserId("ada");

      console.log(items);
      setTodoItems(items);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <ContentContainer>
        {loading ? (
          <FadeLoader />
        ) : (
          <TodoList>
            {todoItems?.map((item) => (
              <TodoItem item={item} />
            ))}
          </TodoList>
        )}
      </ContentContainer>
    </div>
  );
};

export default App;
