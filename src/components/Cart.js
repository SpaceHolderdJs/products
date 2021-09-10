import React, { useContext } from "react";
import { Context } from "../App";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Cart() {
  const { data, dispatch } = useContext(Context);
  return (
    <div className="column centered">
      <h1>Cart</h1>
      {data.user?.cart?.length > 0 ? (
        <div className="row goods-wrapper">
          {data.user.cart.map((good) => (
            <div className="card column shadow">
              <img src={good.images[0].url} alt="good" />
              <h4>{good.name}</h4>
              <div
                className="row centered"
                style={{ justifyContent: "space-between" }}>
                <span>Price: ${good.price.value}</span>
                {good.sale && <span className="row centered sale">Sale</span>}
                {data.user.cart?.find((e) => e.code === good.code) ? (
                  <span
                    className="icon row centered"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_USER_CART",
                        payload: good,
                      })
                    }>
                    <Icon>remove_shopping_cart</Icon>
                  </span>
                ) : (
                  <span
                    className="icon row centered"
                    onClick={() =>
                      dispatch({ type: "ADD_TO_USER_CART", payload: good })
                    }>
                    <Icon>add_shopping_cart</Icon>
                  </span>
                )}
              </div>
              <Link to={`/goodInfo/${good.articles[0].code}`}>More</Link>
              <span>Category: {good.categoryName}</span>
            </div>
          ))}
        </div>
      ) : (
        <h2>Cart is empty</h2>
      )}
    </div>
  );
}
