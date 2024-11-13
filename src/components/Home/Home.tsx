import React from 'react'
import UserList from './UserList'

const Home = () => {
  return (
    <div className="grid grid-cols-6 ">
          <div className="col-span-2">
            
            <UserList />
          </div>
          <div className="col-span-4 ">
            
          </div>
        </div>
  )
}

export default Home