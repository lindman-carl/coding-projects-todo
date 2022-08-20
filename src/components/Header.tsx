import React, { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header-container">
      <div className="text-3xl font-bold drop-shadow-lg">Todo Meister</div>
      {children}
    </div>
  );
};

export default Header;
