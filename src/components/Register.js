/** @format */

import React, { useEffect, useState } from "react";
import "./Register.css";
import { auth, provider } from "../utils/config.js";
import { signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { RegisterSchema } from "../validationSchema/RegisterSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { PUBLIC_IMAGES_PATH } from "../utils/helper";
const Register = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(false);
  const [value, setValue] = useState("");
  console.log("value=======", value);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const signUp = async (data) => {
    try {
      const res = await axios.post("https://reqres.in/api/register", data);
      const result = await res.data;
      if (result) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrMsg(true);
    }
  };
  const { handleChange, handleBlur, touched, errors, handleSubmit } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (data) => {
        signUp(data);
      },
    }
  );
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
    });
  };
  useEffect(() => {});
  return (
    <>
      {value ? (
        <Home />
      ) : (
        <div className="formWrapper">
          <div className="formContent">
            <div className="formTitle">signup</div>
            <div className="regWitGoogle" onClick={handleClick}>
              <div className="google">
                <img src={PUBLIC_IMAGES_PATH + "google.jpg"} alt="" /> Google
              </div>
            </div>
            <div className="regWitEmail"> or sign up with email</div>
            <form onSubmit={handleSubmit}>
              <div className="inputForm">
                <div> Name </div>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="inputForm">
                <div> Email </div>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <span className="errMessage"> {errors.email} </span>
                )}
              </div>
              <div className="inputForm">
                <div> Password </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <span className="errMessage"> {errors.password} </span>
                )}
              </div>
              <div className="inputForm">
                <button type="submit"> Signup</button>
              </div>
              {errMsg ? (
                <div className="errMsg">Please enter valid email address</div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
