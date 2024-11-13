import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConvoHeader from "./ConvoHeader";
import { useEffect, useState } from "react";

const MessageConvo = () => {
  const [user, setUser] = useState({
    username: "",
  });

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const session = sessionStorage.getItem("username");
    if (session)
      setUser({
        username: session,
      });
  }, []);
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <ConvoHeader User = {user} />
      <div className="flex-grow flex flex-col-reverse overflow-y-auto px-5">
        <div className="chat chat-start">
          {/* <div className="chat chat-end"> */}
          <div className="chat-bubble">Je suis motivé</div>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="chat chat-end">
            <div className="chat-bubble">{message}</div>
          </div>
        ))}
      </div>
      <div className="items-center p-4 flex flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Type here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
