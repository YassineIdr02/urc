import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import UserBox from "./RoomBox";
import MessageListHeader from "./RoomMessageListHeader";
import { Link } from "react-router-dom";
import { getAllRooms, getRoomsAsync, RoomProp } from "../../../features/roomSlice";

const RoomList = () => {
  const dispatch = useAppDispatch();
  const Rooms = useAppSelector<RoomProp[]>(getAllRooms);

  useEffect(() => {
    dispatch(getRoomsAsync());
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <MessageListHeader />
      <div className="flex flex-col flex-grow overflow-y-auto shadow gap-3 mt-5">
        {Rooms.map((room: RoomProp, index) => (
          <Link to={`/home/rooms/${room.room_id}`} key={index}>
            <UserBox Room={room} />
            <div className="divider w-[80%] my-0 mx-auto opacity-30"></div>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default RoomList;
