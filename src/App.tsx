import React, { ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FadeLoader } from "react-spinners";

// components
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import { auth, logInWithGoogle } from "./services/firebaseAuthentication";
import { getTodoItemsByUserId } from "./services/firebaseLogic";

// types
import { TodoItemType } from "./types/todoTypes";

type ContentContainerProps = {
  children: ReactNode | ReactNode[];
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="content-container">{children}</div>;
};

const App = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app-container">
      <Header />
      <ContentContainer>
        {!loading && user ? (
          <TodoList uid={user.uid} />
        ) : (
          <button onClick={logInWithGoogle}>Login</button>
        )}
        {}
      </ContentContainer>
    </div>
  );
};

export default App;
