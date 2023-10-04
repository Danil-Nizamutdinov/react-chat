/* eslint-disable react/prop-types */
import React from "react";
import Chat from "./Chat";
import UserList from "./UsersList";

function ChatPage() {
  return (
    <div className="chat_page">
      <UserList />
      <Chat />
    </div>
  );
}

export default ChatPage;
