import React from "react";
import { useNavigate } from "react-router";
import { joinRoom } from "../utils/socket";
const ContactCard = ({ name, chatId, payload }) => {
  const navigate = useNavigate();
  const clickHandler = (val) => {
    joinRoom(payload);
    navigate(`/chat/${val}/${name}`);
  };
  return (
    <div
      onClick={() => clickHandler(chatId)}
      style={{
        marginBottom: "10px",
        backgroundColor: "#eeaaff",
        width: "500px",
        height: "70px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        border: "4px solid #ff99ff",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          margin: "5px",
          borderRadius: "50%",
          border: "5px solid #eeffaa",
          backgroundColor: "#aaeeaa",
        }}
      ></div>
      <p style={{ margin: "20px", fontSize: "30px", color: "white" }}>{name}</p>
    </div>
  );
};

export default ContactCard;
