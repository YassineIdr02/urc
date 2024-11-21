import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConvoHeader from "./RoomConvoHeader";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAllRoomMessages,
  getRoomMessagesAsync,
  sendRoomMessage,
} from "../../../features/messageSlice";
import { useParams } from "react-router-dom";
import { getAllUsers, getUsers, userState } from "../../../features/userSlice";

const RoomMessageConvo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState({ username: "", user_id: -1 });
  const id = sessionStorage.getItem("user_id");
  const userId = id ? parseInt(id) : -1;
  const Users = useAppSelector((state: { user: userState }) =>
    getAllUsers(state, userId)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const room_external_id = Users ? Users.map((user) => user.external_id) : [];

  const [newMessage, setNewMessage] = useState<{
    timestamp: number;
    sender_id: number;
    receiver_id: number;
    receiver_external_id: number;
    room_external_id: number[];
    content: string;
  }>({
    timestamp: Date.now(),
    sender_id: -1,
    receiver_id: -1,
    receiver_external_id: -1,
    room_external_id: [],
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
        user_id: parseInt(session_id) 
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
    if ((newMessage.content !== "" || file) && idRoom) {
      

      dispatch(sendRoomMessage({ message: newMessage, file }));

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
        receiver_external_id: -1,
        room_external_id: [],
        content: "",
      });

      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (idRoom) {
        setNewMessage((prevMessage) => ({
          ...prevMessage,
          content: "_",
          receiver_id: parseInt(idRoom),
          receiver_external_id: -1,
          room_external_id,
          sender_id: user.user_id,
        }));
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      content: e.target.value,
      receiver_id: parseInt(idRoom || "-1"),
      receiver_external_id: -1,
      room_external_id,
      sender_id: user.user_id,
      file: file || null,
    }));
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
        {sortedMessages.length === 0 ? (
          <h1 className="uppercase tracking-widest text-center mt-[25%] text-gray-500">
            Pas de message pour le moment :(
          </h1>
        ) : (
          sortedMessages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.sender_id === user.user_id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">
                {message.attachment && (
                  <img
                    src={message.attachment}
                    alt={message.attachment}
                    className="max-h-60 max-w-64"
                  />
                )}
                {message.content}{" "}
              </div>

              {index === sortedMessages.length - 1 && <div ref={scrollRef} />}
            </div>
          ))
        )}
      </div>

      <div className="items-center p-4 flex flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Type here..."
          value={newMessage.content}
          onChange={handleMessageChange}
          className="input input-bordered w-full"
        />
        <div className="flex flex-row gap-2">
          <button
            className="btn btn-ghost rounded-full relative"
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faImage} className="z-10 text-3xl" />
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 hover:cursor-pointer w-full z-20"
            />
          </button>
          <button
            className="btn btn-ghost rounded-full text-3xl"
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomMessageConvo;
