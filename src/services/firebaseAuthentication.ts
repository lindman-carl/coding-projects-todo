// firebase
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase";

// types
import { UserType } from "../types/firebaseTypes";

// authentication
const auth = getAuth(app);

// google auth provider
const googleAuthProvider = new GoogleAuthProvider();

// sign in with google
const logInWithGoogle = async () => {
  try {
    // sign in with google dialog
    const res = await signInWithPopup(auth, googleAuthProvider);
    // get user from response
    const user = res.user;
    // // query user by uid
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // // get user
    // const docs = await getDocs(q);

    // get user
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (userData === undefined) {
      // if user is not in db, add them
      // create new user data object
      const userData = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      } as UserType;
      // add user to db
      await setDoc(doc(db, "users", user.uid), userData);
    }
  } catch (error) {
    console.log(error);
  }
};

// sign in with email and password
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

// register with email and password
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    // create new user with email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // get user from response
    const user = res.user;
    // create new user data object
    const userData = {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      budget: 0,
    };
    // add user to db
    await addDoc(collection(db, "users"), userData);
  } catch (error) {
    console.error(error);
  }
};

// reset password
const sendPasswordReset = async (email: string) => {
  try {
    // send password reset email and notify user
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    console.error(error);
  }
};

// logout user
const logout = () => {
  signOut(auth);
};

export {
  auth,
  logInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
