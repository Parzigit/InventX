import React from "react";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "20vh" ,minWidth:"75vh"}} className="--pad">
        {children}
      </div>
    </>
  );
};

export default Layout;
