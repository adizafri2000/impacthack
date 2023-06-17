import React, { ReactNode } from "react";
import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex bg-white">
      <Sidebar />
      <Outlet/>
    </div>
  );
};

export default Layout;
