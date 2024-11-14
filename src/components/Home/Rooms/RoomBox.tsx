import { RoomProp } from "../../../features/roomSlice";

interface UserProp {
    username: string;
    last_login: string;
}

const RoomBox = ({ Room }: { Room: RoomProp }) => {
  return (
    
    <div className="flex flex-col">
      <div className="flex flex-row justify-between p-5 w-full gap-4 z-0 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer duration-200">
          <div className="flex flex-col justify-between">
            <h1>{Room.name}</h1>
          </div>
       
      </div>
      <div className="divider w-[80%] my-0 mx-auto opacity-30"></div> 
    </div>
  );
};

export default RoomBox;
