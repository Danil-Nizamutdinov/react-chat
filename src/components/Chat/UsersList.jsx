/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import socket from "../../socket";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("getUsers", (data) => {
      setUsers([...data]);
    });
  }, [socket, users]);

  useEffect(() => {
    socket.on("getUsers", (data) => {
      setUsers([...data]);
    });
  }, []);

  return (
    <div className="users_list">
      <div className="chat_header">Пользователи</div>
      {users.map((u) => (
        <div
          className={`user ${
            u.id === localStorage.getItem("id") ? "current_user" : ""
          }`}
          key={u.id}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;
