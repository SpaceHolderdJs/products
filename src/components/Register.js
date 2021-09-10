import { useState, useContext } from "react";
import React from "react";
import { Redirect } from "react-router-dom";

import { Context } from "../App";

const Register = () => {
  const { data, dispatch } = useContext(Context);

  const [userData, setUserData] = useState({});
  const [registered, setRegistered] = useState(false);

  return (
    <div className="column centered form">
      <h1>Register</h1>
      <span>Login</span>
      <input
        value={userData.login}
        type="text"
        onChange={(e) => setUserData({ ...userData, login: e.target.value })}
      />
      <span>Password</span>
      <input
        value={userData.password}
        type="text"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button
        onClick={() => {
          dispatch({ type: "ADD_USER", payload: userData });
          setUserData({ login: "", password: "" });
          setRegistered(true);
        }}>
        Register
      </button>
      {registered && <Redirect to="/login" />}
    </div>
  );
};

export default Register;
