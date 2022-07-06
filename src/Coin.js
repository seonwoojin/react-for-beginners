import { useEffect, useState } from "react";

let coinPrice;

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [coin, setCoin] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
    setCoin((event.target.value / coinPrice).toFixed(2));
  };

  const awaitFn = async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/tickers");
    const json = await response.json();
    setCoins(json);
    setLoading(false);
    coinPrice = json[0].quotes.USD.price;
  };

  // fetch("https://api.coinpaprika.com/v1/tickers")
  // .then((response) => response.json())
  // .then((json) => {
  //   setCoins(json);
  //   setLoading(false);
  //   coinPrice = json[0].quotes.USD.price;

  // useEffect(async () => {
  //   const response = await fetch("https://api.coinpaprika.com/v1/tickers");
  //   const json = await response.json();
  //   setCoins(json);
  //   setLoading(false);
  //   coinPrice = json[0].quotes.USD.price;
  // }, []);
  // const optionChange = (event) => {
  //   coinPrice = event.target.value;
  //   setMoney(0);
  //   setCoin(0);
  // };

  useEffect(() => {
    awaitFn();
  }, []);

  const optionChange = (event) => {
    coinPrice = event.target.value;
    setMoney(0);
    setCoin(0);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select onChange={optionChange}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol} : {coin.quotes.USD.price})
          </option>
        ))}
      </select>
      <input onChange={onChange} value={money} placeholder="How much ?"></input>
      <div>
        <h1>{coin}</h1>
      </div>
    </div>
  );
}

export default App;
