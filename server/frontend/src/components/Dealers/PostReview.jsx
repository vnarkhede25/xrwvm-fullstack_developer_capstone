/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      const d = await (await fetch("/djangoapp/dealer/" + id)).json();
      if (d.status === 200) {
        const dd = Array.isArray(d.dealer) ? d.dealer[0] : d.dealer;
        setDealer(dd || {});
      }
      const c = await (await fetch("/djangoapp/get_cars")).json();
      setCarmodels(Array.from(c.CarModels));
    };
    load();
  }, []);

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " +
      sessionStorage.getItem("lastname");
    if (name.includes("null")) name = sessionStorage.getItem("username");
    if (!model || !review || !date || !year) {
      alert("All details are mandatory");
      return;
    }
    const [make_chosen, model_chosen] = model.split("|");
    const payload = JSON.stringify({
      name: name,
      dealership: parseInt(id),
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: parseInt(year),
    });
    const res = await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    const json = await res.json();
    if (json.status === 200) window.location.href = "/dealer/" + id;
    else alert("Could not post review: " + (json.message || "error"));
  };

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        <textarea id="review" cols="50" rows="7" value={review}
          placeholder="Write your review"
          onChange={(e) => setReview(e.target.value)}></textarea>
        <div className="input_field">
          Purchase Date{" "}
          <input type="date" value={date}
            onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="input_field">
          Car Make{" "}
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled hidden>Choose Car Make and Model</option>
            {carmodels.map((c, i) => (
              <option key={i} value={c.CarMake + "|" + c.CarModel}>
                {c.CarMake} {c.CarModel}
              </option>
            ))}
          </select>
        </div>
        <div className="input_field">
          Car Year{" "}
          <input type="int" value={year} max={2023} min={2015}
            onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <button className="postreview" onClick={postreview}>
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
