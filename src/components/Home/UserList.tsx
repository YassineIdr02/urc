import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllUsers, getUsers, UserProp } from '../../features/userSlice';
import UserBox from './UserBox';

const UserList = () => {
    const dispatch = useAppDispatch();
    const Users = useAppSelector(getAllUsers)
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    return (
        <div className="flex flex-col flex-grow overflow-y-auto shadow h-screen">
            {Users.map((user: UserProp, index) => (
                <UserBox  User={user} key={index} />
            ))}
        </div>
    );
}

export default UserList