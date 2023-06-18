import React, { useContext, ReactNode } from "react";
import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";
import { DataContext } from "../../Context";
import loading from "../../assets/loading.jpg"

const Layout = () => {
  const { isLoading } = useContext(DataContext);
  return (
    <div className="flex bg-white">
      {isLoading ? (
        <div>
          <img src={loading} alt="Loading" />
        </div>
      ) : (
        <>
          <Sidebar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Layout;
