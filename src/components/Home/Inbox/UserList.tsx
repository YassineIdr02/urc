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
  const Id = sessionStorage.getItem("user_id");
  const userId = Id ? parseInt(Id) : -1;
  const Users = useAppSelector((state: { user: userState }) =>
    getAllUsers(state, userId)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const sortedUsers = [...Users].sort((a: UserProp, b: UserProp) => {
    const dateA = a.last_login ? new Date(a.last_login).getTime() : 0;
    const dateB = b.last_login ? new Date(b.last_login).getTime() : 0;
  
    if (!a.last_login && !b.last_login) return 0; 
    if (!a.last_login) return 1; 
    if (!b.last_login) return -1;
  
    return dateB - dateA; 
  });

  return (
    <div className="flex flex-col h-screen">
      <MessageListHeader />
      <div className="flex flex-col flex-grow overflow-y-auto shadow gap-3 mt-5">
        {sortedUsers.map((user: UserProp, index) => (
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
