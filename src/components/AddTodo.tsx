import React, { useState } from "react";
import { GoPlus } from "react-icons/go";

// services
import { addTodo } from "../services/firebaseLogic";

type AddTodoProps = {
  uid: string;
};

const AddTodo = ({ uid }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (title.length < 1) {
      return;
    }

    // add todo to firestore
    const newTodo = await addTodo(uid, title);
    console.log("new todo:", newTodo);

    // clear input
    setTitle("");
  };

  return (
    <form className="add-todo-container" onSubmit={handleSubmit}>
      <div className="w-full flex justify-start items-center border-b-2">
        <GoPlus className="ml-2" />
        <input
          className="w-full bg-theme-primary outline-none font-medium text-lg px-2"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder={"Add task"}
        />
      </div>
      <button className="bg-theme-secondary px-8 py-2 rounded font-medium text-lg shadow active:scale-95 duration-150">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
