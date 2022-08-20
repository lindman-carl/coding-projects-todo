import {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { TodoItemType } from "../types/todoTypes";
import { db } from "./firebase";

export const getTodoItemsByUserId = async (
  uid: string
): Promise<TodoItemType[] | []> => {
  let todoItems: TodoItemType[] | [] = [];
  try {
    // query for todoItems by uid
    const q = query(collection(db, "todoItems"), where("uid", "==", uid));

    // get snapshot
    const todoItemsSnapshot = await getDocs(q);

    // map todoItems
    todoItems = todoItemsSnapshot.docs.map((doc) => {
      const todoItem = doc.data() as TodoItemType;
      // add id to todoItem
      todoItem.id = doc.id;

      return todoItem;
    });
  } catch (error) {
    // TODO: do something
    console.error(error);
  }

  return todoItems;
};

export const addTodo = async (
  uid: string,
  title: string
): Promise<TodoItemType | null> => {
  try {
    // check for input
    if (title.length < 1) {
      return null;
    }

    const newTodo: TodoItemType = {
      uid,
      title,
      done: false,
      archived: false,
    };

    // add document
    const res = await addDoc(collection(db, "todoItems"), newTodo);

    // add id to newTodo
    return { ...newTodo, id: res.id };
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const toggleDoneTodo = async (
  todoItem: TodoItemType
): Promise<TodoItemType | null> => {
  try {
    if (!todoItem.id) {
      throw Error("TodoItem has no id property");
    }
    const toggledTodo = {
      ...todoItem,
      done: !todoItem.done,
    };
    const res = setDoc(doc(db, "todoItems", todoItem.id), toggledTodo);

    return toggledTodo;
  } catch (error) {
    console.error(error);
  }

  return null;
};
