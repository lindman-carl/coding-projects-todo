import React, { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <div className="header-container">{children}</div>;
};

export default Header;
