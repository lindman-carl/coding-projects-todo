import { getDocs, collection, where, query } from "firebase/firestore";
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

      return todoItem;
    });
  } catch (error) {
    // TODO: do something
    console.error(error);
  }

  return todoItems;
};
