import UserList from './UserList'
import { Outlet } from 'react-router-dom'

const Inbox = () => {
  document.title = "UCR | Inbox"
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