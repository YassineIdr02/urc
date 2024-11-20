import { useAppSelector } from "../../../hooks/hooks";
import { getUser, userState } from "../../../features/userSlice";
import { useParams } from "react-router-dom";

const ConvoHeader = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : parseInt("-1");

  const User = useAppSelector((state: { user: userState }) =>
    getUser(state, userId)
  );

  return (
    <div className="navbar bg-base-100 border-b-2 flex flex-row justify-between px-[5%] sticky top-0 z-0">
        <h1 className="font-semibold text-lg">{User?.username}</h1>
    </div>
  );
};

export default ConvoHeader;
