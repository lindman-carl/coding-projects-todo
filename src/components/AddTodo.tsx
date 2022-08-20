import React from "react";
import { GoPlus } from "react-icons/go";

type AddTodoProps = {
  title: string;
  setTitle: (value: React.SetStateAction<string>) => void;
  handleSubmit: any;
};

const AddTodo = ({ title, setTitle, handleSubmit }: AddTodoProps) => {
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
