/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

function SignIn() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleButton = () => {
    let id = Math.random();
    localStorage.setItem("user", user);
    localStorage.setItem("id", id);
    socket.emit("newUser", {
      name: user,
      id: localStorage.getItem("id"),
    });
    navigate("/chat");
  };

  const updateName = (e) => {
    let text = e.target.value;
    setUser(text);
  };

  if (localStorage.getItem("user")) {
    socket.emit("logout", localStorage.getItem("id"));
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }

  return (
    <section className="sign_in">
      <h1 className="title_sign_in">Вход</h1>
      <input
        type="text"
        placeholder="введите имя"
        value={user}
        className="input_name"
        onChange={updateName}
      />
      <div>
        <button className="button_sign_in" onClick={handleButton}>
          продолжить
        </button>
      </div>
    </section>
  );
}

export default SignIn;
