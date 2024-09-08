import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./components/CoinInfo";
import SideNav from "./components/SideNav";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_URL = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      const blockchainEntries = Object.entries(data.Data)
        .filter(([key, value]) => value.PlatformType === "blockchain")
        .slice(0, 3); //to make it faster.

      const filteredData = Object.fromEntries(blockchainEntries);

      setList(filteredData);
      setFilteredResults(filteredData);
    };

    fetchData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.entries(list).filter(([coin]) =>
        Object.values(coin)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      const filtered = Object.fromEntries(filteredData);

      setFilteredResults(filtered);
    } else {
      setFilteredResults(list);
    }
  };

  return (
    <>
      <SideNav />
      <div className="whole-page">
        <h1>My Crypto List</h1>

        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <div className="list-container">
          <ul>
            {filteredResults &&
              Object.entries(filteredResults).map(([coin]) =>
                filteredResults[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    image={filteredResults[coin].ImageUrl}
                    name={filteredResults[coin].FullName}
                    symbol={filteredResults[coin].Symbol}
                  />
                ) : null
              )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
