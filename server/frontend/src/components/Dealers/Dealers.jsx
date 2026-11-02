/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selected, setSelected] = useState("All");
  const username = sessionStorage.getItem('username');

  const load = async (state) => {
    const url = state === "All"
      ? "/djangoapp/get_dealers"
      : "/djangoapp/get_dealers/" + state;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 200) {
      const list = Array.from(data.dealers);
      if (state === "All") {
        setStates(Array.from(new Set(list.map(d => d.state))).sort());
      }
      setDealers(list);
    }
  };

  useEffect(() => { load("All"); }, []);

  const onChange = (e) => {
    setSelected(e.target.value);
    load(e.target.value);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "10px 20px" }}>
        {username && <h4>Logged in as: {username}</h4>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Dealer Name</th><th>City</th><th>Address</th>
              <th>Zip</th>
              <th>
                <select value={selected} onChange={onChange}>
                  <option value="All">All States</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </th>
              {username && <th>Review Dealer</th>}
            </tr>
          </thead>
          <tbody>
            {dealers.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td><a href={"/dealer/" + d.id}>{d.full_name}</a></td>
                <td>{d.city}</td>
                <td>{d.address}</td>
                <td>{d.zip}</td>
                <td>{d.state}</td>
                {username && (
                  <td><a href={"/postreview/" + d.id}>Review Dealer</a></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dealers;
