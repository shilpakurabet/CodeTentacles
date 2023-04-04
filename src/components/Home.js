/** @format */

import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { PUBLIC_IMAGES_PATH } from "../utils/helper";

const Home = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const Logout = () => {
    sessionStorage.clear();
    navigate("/sign-in");
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          return 0;
        } else return timeLeft - 1;
      });
      if (timeLeft === 0) {
        Logout();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  return (
    <div
      className="homeWrapper"
      style={{
        backgroundImage: `url(${PUBLIC_IMAGES_PATH + "bgImg.webp"})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}>
      <div className="navbar">
        <div className="navbarBrand">
          <img src={PUBLIC_IMAGES_PATH + "logo.png"} alt="" />{" "}
        </div>
        <div className="logout">
          <button onClick={Logout}> Logout</button>
        </div>
      </div>
      <div className="timer">
        <p>You will be logged out in {timeLeft} seconds</p>
      </div>
    </div>
  );
};

export default Home;
