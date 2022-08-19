import React, { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import Header from "./components/Header";

import TodoList from "./components/TodoList";
import { auth, logInWithGoogle } from "./services/firebaseAuthentication";

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
