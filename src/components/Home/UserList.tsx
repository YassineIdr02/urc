import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { getUsers } from '../../features/userSlice';

const UserList = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getUsers())
    },[])
  return (
    <div>UserList</div>
  )
}

export default UserList