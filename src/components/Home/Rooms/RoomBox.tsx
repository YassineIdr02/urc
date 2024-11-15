import { useParams } from "react-router-dom";
import { RoomProp } from "../../../features/roomSlice";
import { motion } from "framer-motion";

const RoomBox = ({ Room }: { Room: RoomProp }) => {
  const { idRoom } = useParams();
  return (
    <>
      {idRoom && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={` bg${
            parseInt(idRoom) === Room.room_id ? "-gray-100" : ""
          }   rounded-md flex flex-col w-[90%] justify-center mx-auto py-7 px-2 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer duration-150 `}
        >
          <div className="flex flex-row justify-between w-full gap-4 z-0 ">
            <div className="flex flex-col justify-between">
              <h1>{Room.name}</h1>
            </div>
          </div>
          {/* <p>{Room.room_id}</p> */}
        </motion.div>
      )}
    </>
  );
};

export default RoomBox;
