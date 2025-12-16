import React from "react";
import { Outlet } from "react-router-dom";
import AdminPage from "./AdminPage.jsx";

export default function AdminLayout() {
  return (
    <div className="md:flex ">
      <div className=" md:w-[50%] lg:w-[23%]">
        <AdminPage />
      </div>
      <div className="md:w-[80%]  ">
        <Outlet />
      </div>
    </div>
  );
}
