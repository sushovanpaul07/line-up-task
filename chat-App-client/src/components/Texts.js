import React from "react";
const Texts = ({ text, userId, createdAt }) => {
  const id = localStorage.getItem("id");
  return (
    <div
      style={{
        width: "20vw",
        height: "max-content",
        marginBottom: "3vh",
        borderRadius: "1vh",
        marginRight: userId !== id ? "auto" : "2vh",
        marginLeft: userId === id ? "auto" : "2vh",
        backgroundColor: "#ffffff",
      }}
    >
      <p style={{ textAlign: userId !== id ? "left" : "right", margin: "2vh" }}>
        {text}
      </p>
      <p style={{ marginLeft: "2vh", color: "#777777" }}>
        {createdAt.slice(11, createdAt.length - 5)}
      </p>
    </div>
  );
};

export default Texts;
