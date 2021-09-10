import axios from "axios";

import { useEffect, useContext, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";

import Icon from "@material-ui/core/Icon";

const Goods = () => {
  const { data, dispatch } = useContext(Context);

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getGoodsFromPage = (page) => {
    const options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
      params: {
        country: "asia2",
        lang: "en",
        currentpage: page,
        pagesize: "30",
        categories: "men_all",
        concepts: "H&M MAN",
      },
      headers: {
        "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        "x-rapidapi-key": "dd8b1590d1mshdef22f7ce4e5a11p15b5c9jsn6adeebd94ead",
      },
    };
    axios.request(options).then((response) => {
      console.log(response);
      dispatch({ type: "INIT_GOODS", payload: response.data.results });
    });
  };

  useEffect(() => {
    getGoodsFromPage(currentPage);
    //inniting pages

    const p = [];

    for (let c = 0; c < 15; c++) {
      p.push(c);
    }

    setPages([...p]);
  }, []);

  useEffect(() => {
    dispatch({ type: "CLEAR_GOODS" });
    getGoodsFromPage(currentPage);
  }, [currentPage]);

  return (
    <div className="column goods">
      <h1>Goods</h1>
      <div className="row goods-wrapper">
        {data.user?.login ? (
          data.goods?.length > 1 ? (
            data.goods.map((good) => (
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
            ))
          ) : (
            <h1>Loading goods from page {currentPage}...</h1>
          )
        ) : (
          <h1>
            Please <Link to="/login">login</Link> to view the goods
          </h1>
        )}
      </div>
      {data.user?.login && (
        <div className="row centered pag-wrapper">
          <span
            className="pag-item row centered"
            onClick={() =>
              setCurrentPage(
                currentPage - 1 < 0 ? pages.length - 1 : currentPage - 1
              )
            }>
            <Icon fontSize="large">arrow_left</Icon>
          </span>
          {pages.map((p) => (
            <span
              className={`row centered pag-item ${
                currentPage === p && "active"
              }`}
              onClick={() => setCurrentPage(p)}>
              {p}
            </span>
          ))}
          <span
            className="pag-item row centered"
            onClick={() =>
              setCurrentPage(currentPage + 1 > 14 ? 0 : currentPage + 1)
            }>
            <Icon fontSize="large">arrow_right</Icon>
          </span>
        </div>
      )}
    </div>
  );
};

export default Goods;
