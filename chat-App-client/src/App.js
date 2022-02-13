import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/chat/:id/:chatName" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
