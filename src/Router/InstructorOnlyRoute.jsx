//import React from "react";
//import { Navigate } from "react-router-dom";
//import useRole from "../Hooks/useRole";
//import { useUser } from "../Hooks/useUser";

//const InstructorOnlyRoute = ({ children }) => {
//  const { loggedUser, userLoading } = useUser();
//  console.log(loggedUser?.email)

//  const role = useRole(loggedUser?.email);
//  console.log(role);

//  if (userLoading) {
//    return <div>loading</div>;
//  }

//  if (!userLoading && role === "instructor") {
//    return children;
//  }

//  return <Navigate to="/auth"></Navigate>;
//};

//export default InstructorOnlyRoute;