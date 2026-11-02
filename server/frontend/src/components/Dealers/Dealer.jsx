/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const load = async () => {
      const d = await (await fetch("/djangoapp/dealer/" + id)).json();
      if (d.status === 200) {
        const dd = Array.isArray(d.dealer) ? d.dealer[0] : d.dealer;
        setDealer(dd || {});
      }
      const r = await (await fetch("/djangoapp/reviews/dealer/" + id)).json();
      if (r.status === 200) setReviews(r.reviews);
    };
    load();
  }, []);

  const icon = (s) =>
    s === "positive" ? positive_icon
      : s === "negative" ? negative_icon : neutral_icon;

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>
          {dealer.full_name}
          {username && (
            <a href={"/postreview/" + id}>
              <img src={review_icon} alt="Post Review"
                style={{ width: "10%", marginLeft: "10px" }} />
            </a>
          )}
        </h1>
        <h4 style={{ color: "grey" }}>
          {dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}
        </h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 ? <p>No reviews yet!</p> :
          reviews.map(r => (
            <div className="review_panel" key={r.id}>
              <img src={icon(r.sentiment)} className="emotion_icon"
                alt="Sentiment" />
              <div className="review">{r.review}</div>
              <div className="reviewer">
                {r.name} {r.car_make} {r.car_model} {r.car_year}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dealer;
