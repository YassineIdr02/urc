import React from 'react'
import UserList from './UserList'
import MessageConvo from './MessageConvo'
import { Outlet } from 'react-router-dom'

const Inbox = () => {
  return (
    <div className="grid grid-cols-6 ">
          <div className="col-span-2">
            <UserList />
          </div>
          <div className="col-span-4 ">
            <Outlet/>
            
          </div>
        </div>
  )
}

export default Inbox