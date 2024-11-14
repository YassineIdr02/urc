import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAllUsers,
  getUsers,
  UserProp,
  userState,
} from "../../../features/userSlice";
import UserBox from "./UserBox";
import MessageListHeader from "./MessageListHeader";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useAppDispatch();
  const userId = sessionStorage.getItem("user_id")
    ? parseInt(sessionStorage.getItem("user_id")!)
    : -1;
  const Users = useAppSelector((state: { user: userState }) =>
    getAllUsers(state, userId)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <MessageListHeader />
      <div className="flex flex-col flex-grow overflow-y-auto shadow">
        {Users.map((user: UserProp, index) => (
          <Link to={`/inbox/${user.user_id}`} key={index}>
            <UserBox User={user} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
