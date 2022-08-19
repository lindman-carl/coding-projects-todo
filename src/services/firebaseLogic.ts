import { getDocs, collection, where, query } from "firebase/firestore";
import { Transaction } from "../types";
import { db } from "./firebase";

export const getTransactionsByUser = async (
  uid: string
): Promise<Transaction[] | []> => {
  const transactions: Transaction[] = [];
  try {
    const q = query(collection(db, "transactions"), where("uid", "==", uid));
    const transactionsSnapshot = await getDocs(q);

    transactionsSnapshot.forEach((doc) => {
      const transaction = doc.data() as Transaction;
      transactions.push(transaction);
    });
  } catch (error) {
    console.log(error);
  }

  return transactions;
};
