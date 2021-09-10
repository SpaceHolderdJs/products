import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Context } from "../App";

const GoodInfo = () => {
  const { code } = useParams();
  const { data } = useContext(Context);

  const [info, setInfo] = useState();
  const [good, setGood] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
      params: { lang: "en", productcode: code, country: "asia2" },
      headers: {
        "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        "x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
      },
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      setInfo(response.data.product);
    });

    setGood(data.goods.find((good) => good.articles[0].code === code));
  }, []);

  return (
    <div className="column">
      <h1>Good Info, code: {code}</h1>
      {info ? (
        <div className="row good-info">
          <img src={good.images[0].url} alt="good" />
          <div className="column">
            <h1>{info.name}</h1>
            <p>{info.description}</p>
            <div className="row" style={{ width: "50vw" }}>
              <span>Color:</span>
              <span
                className="color"
                style={{ background: `${info.color.rgbColor}` }}></span>
            </div>
            <span>Made in {info.countryOfProduction}</span>
            <span>Price: ${info.whitePrice.price}</span>
            <button onClick={() => window.history.back()}>Back</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default GoodInfo;
