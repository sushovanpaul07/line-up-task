import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactCard from "./ContactCard";
import { Formik, Form, Field, ErrorMessage } from "formik";

const renderContacts = (contacts) => {
  if (contacts) {
    // console.log("==>", contacts);

    return contacts.map((contact) => {
      let tag = 0;
      if (contact.users[0] === localStorage.getItem("id")) {
        tag = 1;
      }

      return (
        <ContactCard
          chatId={contact.id}
          name={contact.names[tag]}
          payload={contact}
        />
      );
    });
  }
  return <div>Loading contacts</div>;
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const onSubmit = async (values) => {
    const { data } = await axios.post(
      "https://line-up-sp07.herokuapp.com/api/v1/chat/addRoom",
      {
        userId: localStorage.getItem("id"),
        email: values.email,
      }
    );
    // console.log(data);
    setTrigger((val) => {
      return 1 - val;
    });
  };
  useEffect(async () => {
    const userId = localStorage.getItem("id");
    const { data } = await axios.get(
      `https://line-up-sp07.herokuapp.com/api/v1/chat/getAllRooms/${userId}`
    );
    // console.log(data);
    setContacts(data);
  }, []);

  useEffect(async () => {
    const userId = localStorage.getItem("id");
    const { data } = await axios.get(
      `https://line-up-sp07.herokuapp.com/api/v1/chat/getAllRooms/${userId}`
    );
    // console.log(data);
    setContacts(data);
  }, [trigger]);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Contacts</h1>
      <div
        style={{
          height: "60vh",
          padding: "10px",
          overflowY: "scroll",
          width: "max-content",
          backgroundColor: "#aaaaaa",
        }}
      >
        {renderContacts(contacts)}
      </div>
      <div
        style={{ backgroundColor: "#ffaabb", width: "530px", height: "25vh" }}
      >
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={onSubmit}
        >
          <Form>
            <label style={{ margin: "3vh", height: "5vh" }}>
              Add Friend's Email
            </label>
            <Field
              style={{ margin: "3vh", height: "5vh" }}
              id="email"
              name="email"
              type="email"
              placeholder="Friend's email"
            ></Field>
            <div>
              <ErrorMessage name="email" />
            </div>

            <button style={{ margin: "3vh", height: "5vh" }} type="submit">
              add Chat Room
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Contacts;
