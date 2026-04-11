import { useState, useEffect } from "react";
import "./Content.css";
import OfferDots from "./OfferDots"; // ✅ NEW IMPORT

const offers = [
  { title: "🔥 Special Offers 🔥", text: "Flat 30% off on all items!" },
  { title: "🎉 New User Offer 🎉", text: "Get 50% OFF on your first order!" },
  { title: "💎 Membership Deal 💎", text: "Join premium & get exclusive discounts!" },
];

function Content() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content">
      <div className="offers-wrapper">
        <div className="offers-box">
          <div className="offer-content">
            <h2>{offers[index].title}</h2>
            <p>{offers[index].text}</p>
          </div>

          {/* ✅ MOVED TO SEPARATE COMPONENT */}
          <OfferDots
            offers={offers}
            index={index}
            setIndex={setIndex}
          />

        </div>
      </div>
    </div>
  );
}

export default Content;