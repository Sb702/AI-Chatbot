import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "./UserAuth.css";

export default function UserAuth({ loggedIn, setLoggedIn, setUser }) {
  const [selectedOption, setSelectedOption] = useState("login");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="auth-container">
      <div className="auth-button-container">
        <label className="auth-input-container">
          <input
            className="auth"
            type="radio"
            value="login"
            checked={selectedOption === "login"}
            onChange={() => handleOptionChange("login")}
          />
          Login
        </label>
        <label className="auth-input-container">
          <input
            type="radio"
            value="register"
            checked={selectedOption === "register"}
            onChange={() => handleOptionChange("register")}
          />
          Register
        </label>
      </div>
      {selectedOption === "login" ? (
        <Login setLoggedIn={setLoggedIn} setUser={setUser} />
      ) : (
        <Register />
      )}
    </div>
  );
}
