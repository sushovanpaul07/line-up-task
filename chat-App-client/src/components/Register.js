import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const Register = () => {d
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };
  const onSubmit = async (values) => {
    const { data } = await axios.post(
      "https://line-up-sp07.herokuapp.com/api/v1/auth/register",
      values
    );
    // console.log(data);
    localStorage.setItem("id", data.id);
    navigate("/contacts");
  };
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
      <div
        style={{
          width: "350px",
          height: "500px",
          borderRadius: "10px",
          backgroundColor: "#ffcccc",
        }}
      >
        <p style={{ margin: "5vh" }}>Register Here</p>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={onSubmit}
        >
          <Form>
            <Field
              style={{ margin: "3vh", height: "5vh" }}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
            ></Field>
            <div>
              <ErrorMessage name="username" />
            </div>
            <Field
              style={{ margin: "3vh", height: "5vh" }}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            ></Field>
            <div>
              <ErrorMessage name="email" />
            </div>
            <Field
              style={{ margin: "3vh", height: "5vh" }}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            ></Field>
            <div>
              <ErrorMessage name="password" />
            </div>

            <button style={{ margin: "3vh", height: "5vh" }} type="submit">
              Create
            </button>
          </Form>
        </Formik>
        <div>
          Already have an account ?
          <button
            onClick={() => {
              loginHandler();
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
