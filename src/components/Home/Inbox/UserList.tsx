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
      <div className="flex flex-col flex-grow overflow-y-auto shadow gap-3 mt-5">
        {Users.map((user: UserProp, index) => (
          <Link to={`/home/inbox/${user.user_id}`} key={index}>
            <UserBox User={user} />
            <div className="divider w-[80%] my-0 mx-auto opacity-30"></div>

          </Link>
        ))}
        
      </div>
    </div>
  );
};

export default UserList;
