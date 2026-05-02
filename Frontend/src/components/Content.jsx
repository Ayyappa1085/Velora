// components/Content.jsx
import { useState, useEffect } from "react";
import "./Content.css";
import OfferDots from "./OfferDots";
import { OFFERS } from "../data/offers";

function Content() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % OFFERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content">
      <div className="offers-wrapper">
        <div className="offers-box">
          <div className="offer-content">
            <h2>{OFFERS[index].title}</h2>
            <p>{OFFERS[index].text}</p>
          </div>

          <OfferDots
            offers={OFFERS}
            index={index}
            setIndex={setIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;