import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
