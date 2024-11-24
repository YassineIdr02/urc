import { Outlet } from 'react-router-dom'
import RoomList from './RoomList'

const RoomInbox = () => {
  document.title = "UCR | Rooms"
  return (
    <div className="grid grid-cols-6 ">
          <div className="col-span-2">
            <RoomList />
          </div>
          <div className="col-span-4 ">
            <Outlet/>
            
          </div>
        </div>
  )
}

export default RoomInbox