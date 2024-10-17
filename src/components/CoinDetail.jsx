import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const details = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +
          API_KEY
      );
      const description = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +
          API_KEY
      );

      const detailsJson = await details.json();
      const descriptionJson = await description.json();

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descriptionJson.Data,
      });
    };

    getCoinDetail().catch(console.error);
  }, [params.symbol]);

  if (!fullDetails?.textData || !fullDetails?.numbers) {
    return <div></div>;
  }

  const coinInfo = fullDetails.textData[params.symbol];
  const coinDisplay = fullDetails.numbers[params.symbol].USD;

  return (
    <>
      <h1>{fullDetails.textData[params.symbol].FullName}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${
          fullDetails.numbers[params.symbol].USD.IMAGEURL
        }`}
        alt={`Small icon for ${params.symbol} crypto coin`}
      />
      <div> {fullDetails.textData[params.symbol].Description}</div>
      <br></br>
      <div>
        This coin was built with the algorithm{" "}
        {fullDetails.textData[params.symbol].Algorithm}{" "}
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Launch Date </th>
              <td>{coinInfo.AssetLaunchDate || "N/A"}</td>
            </tr>
            <tr>
              <th>Website </th>
              <td>
                <a
                  href={coinInfo.AssetWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {coinInfo.AssetWebsiteUrl || "N/A"}
                </a>
              </td>
            </tr>
            <tr>
              <th>Whitepaper </th>
              <td>
                <a
                  href={coinInfo.AssetWhitepaperUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {coinInfo.AssetWhitepaperUrl || "N/A"}
                </a>
              </td>
            </tr>
            <tr>
              <th>Monetary Symbol </th>
              <td>{params.symbol}</td>
            </tr>
            <tr>
              <th>Market </th>
              <td>{coinDisplay.MARKET || "N/A"}</td>
            </tr>
            <tr>
              <th>Last Transaction </th>
              <td>{coinDisplay.LASTUPDATE || "N/A"}</td>
            </tr>
            <tr>
              <th>Last Transaction Value</th>
              <td>{coinDisplay.PRICE || "N/A"}</td>
            </tr>
            <tr>
              <th>Volume </th>
              <td>{coinDisplay.VOLUME24HOUR || "N/A"}</td>
            </tr>
            <tr>
              <th>Today's Open Price </th>
              <td>{coinDisplay.OPENDAY || "N/A"}</td>
            </tr>
            <tr>
              <th>Highest Price during the Day </th>
              <td>{coinDisplay.HIGHDAY || "N/A"}</td>
            </tr>
            <tr>
              <th>Lowest Price during the Day </th>
              <td>{coinDisplay.LOWDAY || "N/A"}</td>
            </tr>
            <tr>
              <th>Change from Previous Day </th>
              <td>{coinDisplay.CHANGEPCT24HOUR || "N/A"}%</td>
            </tr>
            <tr>
              <th>Market Cap </th>
              <td>{coinDisplay.MKTCAP || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Chart symbol={params.symbol} market={coinDisplay.MARKET} />
    </>
  );
};

export default CoinDetail;
