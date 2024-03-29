import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import { FaChalkboardTeacher, FaUsersCog } from "react-icons/fa";
import "./Sidebar.scss";
import logo from "../../assets/logos/logo3.png";
import { SiGoogleclassroom } from "react-icons/si";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCategory,
} from "react-icons/md";
import { useUser } from "../../Hooks/useUser";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate()
  const { logOut } = useUser();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut().then(() => {
      toast.success("Log out Successful", { position: "top-right" });
      navigate('/')
      window.location.reload();
    });
  };

  return (
    <div>
      {/* for phone */}
      <div className=" md:hidden inset-y-0 z-10 flex w-20 bg-primary h-screen sticky top-0">
        <div className="z-10 flex flex-col flex-1">
          <Link to={'/'} className=" pl-5 pt-5  ">
            <img src={logo} alt="" className="w-10 " />
          </Link>
          <nav className="flex flex-col flex-1 w-20 p-4 mt-4 gap-4 text-secondary sidebar">
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 w-fit"
            >
              <AiOutlineHome className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/manageUsers"
              className="flex items-center space-x-2 w-fit "
            >
              <FaUsersCog className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/manageInstructor"
              className="flex items-center space-x-2 w-fit"
            >
              <FaChalkboardTeacher className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/manageCourses"
              className="flex items-center space-x-2 w-fit"
            >
              <SiGoogleclassroom className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/categories"
              className="flex items-center space-x-2 w-fit"
            >
              <MdOutlineCategory className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/allTransactions"
              className="flex items-center space-x-2 w-fit"
            >
              <MdOutlineAccountBalanceWallet className="text-xl" />
            </NavLink>
            <NavLink to="/" className="flex items-center space-x-2 w-fit">
              <AiOutlineHome className="text-xl" />
            </NavLink>
          </nav>
          <div className="flex-shrink-0 p-4">
            <button onClick={handleLogOut} className="flex items-center space-x-2 text-secondary">
            <AiOutlineLogin className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed hidden inset-y-0 z-10 md:flex w-80">
        <svg
          className="absolute inset-0 w-full h-full text-white"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="#213555"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>

        <div className="z-10 flex flex-col flex-1">
          <Link to={'/'} className="flex items-end justify-between flex-shrink-0 pl-2  w-28">
            <img src={logo} alt="" className="w-24 " />
            <div className="text-2xl text-secondary font-normal mb-2">
              SKILLS VOYAGE
            </div>
          </Link>
          <nav className="flex flex-col flex-1 w-64 p-4 mt-4 gap-4 text-secondary sidebar">
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 w-fit"
            >
              <AiOutlineHome className="text-xl" />
              <p className="text-base"> Home</p>
            </NavLink>
            <NavLink
              to="/dashboard/manageUsers"
              className="flex items-center space-x-2 w-fit "
            >
              <FaUsersCog className="text-xl" />
              <span className="text-base">Manage Users</span>
            </NavLink>
            <NavLink
              to="/dashboard/manageInstructor"
              className="flex items-center space-x-2 w-fit"
            >
              <FaChalkboardTeacher className="text-xl" />
              <span className="text-base">Manage Instructors</span>
            </NavLink>
            <NavLink
              to="/dashboard/manageCourses"
              className="flex items-center space-x-2 w-fit"
            >
              <SiGoogleclassroom className="text-xl" />
              <span className="text-base">Manage Courses</span>
            </NavLink>
            <NavLink
              to="/dashboard/categories"
              className="flex items-center space-x-2 w-fit"
            >
              <MdOutlineCategory className="text-xl" />
              <span className="text-base">Manage Categories</span>
            </NavLink>
            <NavLink
              to="/dashboard/allTransactions"
              className="flex items-center space-x-2 w-fit"
            >
              <MdOutlineAccountBalanceWallet className="text-xl" />
              <span className="text-base">All Transactions</span>
            </NavLink>
            <NavLink to="/" className="flex items-center space-x-2 w-fit">
              <AiOutlineHome className="text-xl" />
              <span className="text-base">All Classes</span>
            </NavLink>
          </nav>
          <div className="flex-shrink-0 p-4">
            <button
              onClick={handleLogOut}
              className="flex items-center space-x-2 text-white"
            >
              <AiOutlineLogin className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
