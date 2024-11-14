import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageListHeader = () => {
  return (
    <div className="navbar flex w-full flex-row justify-between bg-base-100 h-20 px-[5%] border-b-2 sticky top-0 z-10">
      <h1 className=" text-4xl font-semibold">Inbox</h1>
      <FontAwesomeIcon icon={faCommentMedical} className="text-3xl" />
    </div>
  );
};

export default MessageListHeader;
