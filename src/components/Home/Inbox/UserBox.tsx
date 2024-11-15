import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

interface UserProp {
  user_id: number;
    username: string;
    last_login: string;
}

const UserBox = ({ User }: { User: UserProp }) => {
  const { id } = useParams();
  return (
    <>
    {id && (
    <motion.div
          whileHover={{ scale: 1.03 }}
          className={` bg${
            parseInt(id) === User.user_id ? "-gray-100" : ""
          }   rounded-md flex flex-col w-[90%] justify-center mx-auto py-6 px-2 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer duration-150 `}
        >
      <div className="flex flex-row justify-between w-full gap-4 z-0 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer duration-200">
          <div className="flex flex-col justify-between">
            <h1>{User.username}</h1>
          </div>
      </div>
        <div>
          <p className="text-gray-400 text-sm whitespace-nowrap">{User.last_login}</p>
        </div>
    </motion.div>
    )}
    </>
  );
};

export default UserBox;
