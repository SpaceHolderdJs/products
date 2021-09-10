import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { Context } from "../App";

const Login = () => {
  const { data, dispatch } = useContext(Context);
  console.log(data);

  const [userData, setUserData] = useState({});
  return (
    <div className="column centered form">
      <h1>Login</h1>
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
          data.users.find(
            (user) =>
              user.login === userData.login &&
              user.password === userData.password
          )
            ? dispatch({ type: "LOGIN", payload: { ...userData } })
            : alert("User is not find");

          setUserData({ login: "", password: "" });
        }}>
        Login
      </button>
      {data.user?.login && <Redirect to="/goods" />}
    </div>
  );
};

export default Login;
