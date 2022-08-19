import React, { ReactNode, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

import { getTodoItemsByUserId } from "../services/firebaseLogic";
import { TodoItemType } from "../types/todoTypes";
import TodoItem from "./TodoItem";

type TodoListProps = {
  // children: ReactNode | ReactNode[];
  uid: string;
};

const TodoList = ({ uid }: TodoListProps) => {
  const [todoItems, setTodoItems] = useState<TodoItemType[] | undefined>();
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const items = await getTodoItemsByUserId(uid);

      console.log(items);
      setTodoItems(items);
      setFetching(false);
    };

    getData();
  }, []);

  return (
    <div className="todo-list-container">
      {fetching ? (
        <FadeLoader />
      ) : (
        todoItems?.map((item) => <TodoItem item={item} key={item.id} />)
      )}
    </div>
  );
};

export default TodoList;
