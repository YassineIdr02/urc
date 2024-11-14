import userEvent from "@testing-library/user-event";
import { useAppSelector } from "../../../hooks/hooks";
import { getUser, userState } from "../../../features/userSlice";
import { useParams } from "react-router-dom";
import { getRoom, RoomProp, roomState } from "../../../features/roomSlice";

const ConvoHeader = () => {
  const { idRoom } = useParams<{ idRoom: string }>();
  const roomId = idRoom ? parseInt(idRoom) : parseInt("-1");

  const Room = useAppSelector((state: { room: roomState }) =>
    getRoom(state, roomId)
  );

  return (
    <div className="navbar bg-base-100 border-b-2 flex flex-rox justify-between  h-20 px-[5%] sticky top-0 z-0">
      <div className="flex-row flex gap-4 ">
        <h1 className="font-semibold text-lg">{Room?.name}</h1>
      </div>
    </div>
  );
};

export default ConvoHeader;
