import { useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import "./App.css";
import "./animation.css";

import { Icon } from "@material-ui/core";

import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Goods from "./components/Goods";
import Cart from "./components/Cart";
import GoodInfo from "./components/GoodInfo";

export const Context = createContext(null);

const reducer = (data, action) => {
  switch (action.type) {
    case "INIT_GOODS":
      return { ...data, goods: action.payload };
    case "CLEAR_GOODS":
      return { ...data, goods: [] };
    case "ADD_USER":
      return {
        ...data,
        users: [...data.users, { ...action.payload, cart: [] }],
      };
    case "ADD_TO_USER_CART":
      return {
        ...data,
        user: { ...data.user, cart: [...data.user.cart, action.payload] },
        users: [
          ...data.users.filter((e) => e.login !== data.user.login),
          { ...data.user, cart: [...data.user.cart, action.payload] },
        ],
      };
    case "REMOVE_FROM_USER_CART":
      return {
        ...data,
        user: {
          ...data.user,
          cart: data.user.cart.filter((e) => e.code !== action.payload.code),
        },
        users: [
          ...data.users.filter((e) => e.login !== data.user.login),
          {
            ...data.user,
            cart: data.user.cart.filter((e) => e.code !== action.payload.code),
          },
        ],
      };
    case "LOGIN":
      return {
        ...data,
        user: data.users.find((e) => e.login === action.payload.login),
      };
    case "LOGOUT":
      return { ...data, user: {} };
    default:
      return data;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, {
    goods: [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(data.users));
    console.log(localStorage.getItem("users"));
  }, [data.users]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(localStorage.getItem("user"));
  }, [data.user]);

  return (
    <Context.Provider value={{ data, dispatch }}>
      <Router>
        <div className="App">
          <header className="row shadow">
            <div className="row centered">
              <Link to="/">Main</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/goods">Goods</Link>
              {data.user.login && <Link to="/cart">Cart</Link>}
            </div>
            {data.user.login && (
              <div className="row centered" style={{ color: "orange" }}>
                <Icon fontSize="large">person</Icon>
                <h4>{data.user.login}</h4>
                <button onClick={() => dispatch({ type: "LOGOUT" })}>
                  Logout
                </button>
              </div>
            )}
          </header>
        </div>

        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/goods">
            <Goods />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/goodInfo/:code">
            <GoodInfo />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
