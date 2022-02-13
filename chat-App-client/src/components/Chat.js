import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Texts from "./Texts";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import io from "socket.io-client";
// import { sendText } from "../utils/socket";
// import { Socket } from "../utils/socket";
let initialValues = {
  text: "",
};
const Chat = ({ name }) => {
  const [texts, setTexts] = useState();
  const { id, chatName } = useParams();
  const [chatname, setChatname] = useState();

  // useEffect(() => {
  //   setSocket(Socket);
  //   return () => Socket.close();
  // }, [setSocket]);

  // useEffect(() => {
  //   const messageListener = (message) => {
  //     setTexts((prevMessages) => {
  //       const newMessages = [...prevMessages];
  //       newMessages.push(message);
  //       return newMessages;
  //     });
  //   };

  //   socket.on("message", messageListener);

  //   return () => {
  //     socket.off("message", messageListener);
  //   };
  // }, [socket]);

  const onSubmit = async (values, { resetForm }) => {
    initialValues.text = "";
    resetForm();

    const { data } = await axios.post(
      `https://line-up-sp07.herokuapp.com/api/v1/chat/SendMessage`,
      {
        roomId: id,
        userId: localStorage.getItem("id"),
        text: values.text,
      }
    );
    return;
  };

  // console.log(id);
  useEffect(async () => {
    const { data } = await axios.get(
      `https://line-up-sp07.herokuapp.com/api/v1/chat/getAllChats/${id}`
    );
    setTexts(data.reverse());
  }, [id]);

  useEffect(async () => {
    const { data } = await axios.get(
      `https://line-up-sp07.herokuapp.com/api/v1/chat/getAllChats/${id}`
    );
    setTexts(data.reverse());
  }, [texts]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "60vw", height: "80vh" }}>
        <div
          style={{
            width: "60vw",
            height: "10vh",
            backgroundColor: "#aaffcc",
            // padding: "1vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <p style={{ fontSize: "30px", margin: "1vh" }}> {chatName} </p>
        </div>
        <div
          style={{
            width: "60vw",
            height: "60vh",
            backgroundColor: "#cccccc",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
          }}
        >
          {texts ? (
            texts.map((text) => {
              return (
                <Texts
                  text={text.text}
                  userId={text.userId}
                  createdAt={text.createdAt}
                />
              );
            })
          ) : (
            <div />
          )}
        </div>
        <div
          style={{
            width: "60vw",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <Field
                style={{ margin: "3vh", height: "5vh", width: "40vw" }}
                id="text"
                name="text"
                type="text"
                placeholder="message"
              ></Field>

              <button
                style={{ margin: "3vh", height: "5vh", width: "10vw" }}
                type="submit"
              >
                send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Chat;
