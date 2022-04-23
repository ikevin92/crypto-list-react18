import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Crypto = () => {
  // 1 setear los hooks
  const [search, setSearch] = useState('');
  const [cryptos, setCryptos] = useState([]);
  // 2 funcion para traer los datos
  const ENDPOINT = 'https://api.coingecko.com/api/v3/coins';

  const getCryptosAPI = async () => {
    try {
      const res = await axios.get(ENDPOINT);
      console.log(res.data);
      setCryptos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 3 funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // 4 filtrar los datos
  const results = !search
    ? cryptos
    : cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()),
      );

  useEffect(() => {
    getCryptosAPI();
  }, []);

  // renderizamos la busqueda
  return (
    <>
      <input
        type='text'
        value={search}
        onChange={searcher}
        placeholder='Search...'
        className='form-control'
      />

      <table className='table table-dark table-hover mt-3'>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24h</th>
          </tr>
        </thead>
        <tbody>
          {results.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.market_data.market_cap_rank}</td>
              <td>
                <img src={crypto.image.small} alt='crypto.id' /> {crypto.name}
              </td>
              <td>{crypto.symbol.toUpperCase()}</td>
              <td>{crypto.market_data.current_price.bmd.toFixed(2)}</td>
              <td>
                {crypto.market_data.price_change_percentage_24h < 0 ? (
                  <span className='badge bg-danger'>
                    {crypto.market_data.price_change_percentage_24h}
                  </span>
                ) : (
                  <span className='badge bg-success'>
                    {crypto.market_data.price_change_percentage_24h}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Crypto;
