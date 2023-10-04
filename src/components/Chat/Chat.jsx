/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("getMessages", (data) => {
      setMessages([...data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("getMessages", (data) => {
      setMessages([...data]);
    });
  }, []);

  const updateMessageText = (e) => {
    let text = e.target.value;
    setMessage(text);
  };

  const handleSignOut = () => {
    socket.emit("logout", localStorage.getItem("id"));
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    navigate("/");
  };

  const handleSend = () => {
    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        message,
        name: localStorage.getItem("user"),
        messageId: `${socket.id}-${Math.random()}`,
        socketId: socket.id,
        userId: localStorage.getItem("id"),
      });
    }

    setMessage("");
  };

  return (
    <div>
      <div className="chat">
        <div className="chat_header">
          <h1>Чат</h1>{" "}
          <button className="chat_button_signout" onClick={handleSignOut}>
            Выйти
          </button>
        </div>
        <div className="chat_body">
          {messages.map((m) => (
            <div
              key={m.messageId}
              className={`${
                m.userId === localStorage.getItem("id")
                  ? "chat_message_box_user"
                  : ""
              }`}
            >
              <div className={`chat_message_box`}>
                <div className="chat_name">{m.name}</div>
                <div className="chat_message">{m.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat_input">
          <textarea
            placeholder="Send a message..."
            onChange={updateMessageText}
            value={message}
          ></textarea>
          <button className="chat_button_send" onClick={handleSend}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
