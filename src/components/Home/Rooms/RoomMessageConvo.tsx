import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConvoHeader from "./RoomConvoHeader";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAllRoomMessages,
  getRoomMessagesAsync,
  Message,
  sendRoomMessage,
} from "../../../features/messageSlice";
import { useParams } from "react-router-dom";

import { getAllUsers, getUsers, UserProp } from "../../../features/userSlice";

const RoomMessageConvo = () => {
  const [user, setUser] = useState({
    username: "",
    user_id: -1,
  });

  const [newMessage, setNewMessage] = useState<Message>({
    timestamp: Date.now(),
    sender_id: -1,
    receiver_id: -1,
    content: "",
  });

  const { idRoom } = useParams();
  const dispatch = useAppDispatch();
  const ConvoMessages = useAppSelector(getAllRoomMessages);
  const scrollRef = useRef<HTMLDivElement>(null);




  useEffect(() => {
    const session_username = sessionStorage.getItem("username");
    const session_id = sessionStorage.getItem("user_id");

    if (session_username && session_id) {
      setUser({
        username: session_username,
        user_id: parseInt(session_id),
      });
    }

    if (idRoom && user.user_id !== -1) {
      dispatch(
        getRoomMessagesAsync({
          receiver_id: parseInt(idRoom),
          user_id: user.user_id,
        })
      );
    }
  }, [dispatch, idRoom, user.user_id]);

  const handleSendMessage = () => {
    if (newMessage.content !== "" && idRoom) {
      dispatch(sendRoomMessage(newMessage));
      dispatch(
        getRoomMessagesAsync({
          receiver_id: parseInt(idRoom),
          user_id: user.user_id,
        })
      );
      setNewMessage({
        timestamp: Date.now(),
        sender_id: user.user_id,
        receiver_id: parseInt(idRoom || "-1"),
        content: "",
      });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (idRoom)
      setNewMessage({
        ...newMessage,
        content: e.target.value,
        receiver_id: parseInt(idRoom),
        sender_id: user.user_id,
      });
  };

  const sortedMessages = [...ConvoMessages].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages]);

  return (
    <div className="h-screen flex flex-col">
      <ConvoHeader />
      <div className="flex-grow flex flex-col overflow-y-auto px-5">
        {sortedMessages.map((message, index) => (
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

export default RoomMessageConvo;