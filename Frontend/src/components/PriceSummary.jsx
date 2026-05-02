function PriceSummary({ totalPrice = 0, discountAmount = 0, finalTotal = 0 }) {
  const deliveryDate = new Date();

  deliveryDate.setDate(deliveryDate.getDate() + 4);

  const deliveryText = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="price-summary">
      <div>
        <span>Subtotal</span>
        <span>₹{Math.round(totalPrice)}</span>
      </div>

      <div>
        <span>Discount</span>
        <span>-₹{Math.round(discountAmount)}</span>
      </div>

      <div>
        <span>Delivery</span>
        <span>Free</span>
      </div>

      <div className="total-row">
        <span>Total</span>
        <span>₹{Math.round(finalTotal)}</span>
      </div>

      <p className="delivery-text">Delivery by {deliveryText}</p>
    </div>
  );
}

export default PriceSummary;
