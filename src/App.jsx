import React from "react";
import "./styles/main.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import ChatPage from "./components/Chat/ChatPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
