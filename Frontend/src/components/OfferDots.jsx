// components/OfferDots.jsx
function OfferDots({ offers, index, setIndex }) {
  return (
    <div className="dots">
      {offers.map((_, i) => (
        <span
          key={i}
          className={i === index ? "dot active" : "dot"}
          onClick={() => setIndex(i)}
        ></span>
      ))}
    </div>
  );
}

export default OfferDots;
