import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "Error") {
        setPrice("N/A");
        return;
      } else {
        setPrice(data.USD);
      }
    };

    getCoinPrice().catch(console.error);
  }, [symbol]);

  return (
    <li className="main-list" key={symbol}>
      <img
        className="icons"
        src={`https://www.cryptocompare.com${image}`}
        alt={`Small icon for ${name} crypto coin`}
      />
      {name} <span className="tab"></span> ${price} USD
    </li>
  );
};

export default CoinInfo;
