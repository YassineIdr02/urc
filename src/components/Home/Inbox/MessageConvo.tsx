import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConvoHeader from "./ConvoHeader";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAllMessages,
  getMessagesAsync,
  Message,
  sendMessage,
} from "../../../features/messageSlice";
import { useParams } from "react-router-dom";

const MessageConvo = () => {
  const [user, setUser] = useState({
    username: "",
    user_id: -1,
  });

  const [newMessage, setNewMessage] = useState<Message>({
    sender_id: -1,
    receiver_id: -1,
    content: "",
  });

  const { id } = useParams(); 
  const dispatch = useAppDispatch();
  const ConvoMessages = useAppSelector(getAllMessages);

  console.log(ConvoMessages);
  

  useEffect(() => {
    const session_username = sessionStorage.getItem("username");
    const session_id = sessionStorage.getItem("user_id");

    if (session_username && session_id) {
      setUser({
        username: session_username,
        user_id: parseInt(session_id),
      });
    }

    if (id && user.user_id !== -1) {
      dispatch(
        getMessagesAsync({ receiver_id: parseInt(id), user_id: user.user_id })
      );
    }
  }, [dispatch, id, user.user_id]);

  const handleSendMessage = () => {
    if (newMessage.content !== "" && id) {
      dispatch(sendMessage(newMessage));
      dispatch(
        getMessagesAsync({ receiver_id: parseInt(id), user_id: user.user_id })
      );
      setNewMessage({
        sender_id: user.user_id,
        receiver_id: parseInt(id || "-1"),
        content: "",
      });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id)
      setNewMessage({
        ...newMessage,
        content: e.target.value,
        receiver_id: parseInt(id),
        sender_id: user.user_id,
      });
  };

  return (
    <div className="h-screen flex flex-col">
      <ConvoHeader User={user} />
      <div className="flex-grow flex flex-col-reverse overflow-y-auto px-5">
        {ConvoMessages.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.sender_id === user.user_id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>

      <div className="items-center p-4 flex flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Type here..."
          value={newMessage.content}
          onChange={handleMessageChange}
          className="input input-bordered w-full"
        />
        <button
          className="btn btn-ghost rounded-full text-2xl"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default MessageConvo;
