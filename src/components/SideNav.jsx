import { useEffect, useState } from "react";
import Scam from "./Scam";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_URL = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`;

const SideNav = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // var requestOptions = {
      //   method: "GET",
      //   redirect: "follow",
      // };

      //API not working

      // const response = await fetch(
      //   "https://api.cryptoscamdb.org/v1/featured",
      //   requestOptions
      // );
      // const data = await response.json();

      const response = await fetch(API_URL);
      const data = await response.json();

      const blockchainEntries = Object.entries(data.Data)
        .filter(([key, value]) => value.PlatformType === "blockchain")
        .slice(0, 3); //to make it faster.

      const filteredData = Object.fromEntries(blockchainEntries);

      setList(filteredData);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="sidenav">
      Recommended:
      <p />
      cryptoscamdb NOT working
      <ul>
        {list &&
          Object.values(list).map((coin) => (
            <Scam key={coin.Symbol} name={coin.Symbol} />
          ))}
      </ul>
    </div>
  );
};

export default SideNav;
