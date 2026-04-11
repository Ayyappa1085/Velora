import { FaShoppingBag } from "react-icons/fa";

function ProductInfo({ product }) {
  return (
    <div className="card-info">

      <div className="title-row">
        <h4>{product.title}</h4>

        <span className="plus-icon">
          <FaShoppingBag />
        </span>
      </div>

      <p className="subtitle">{product.subtitle}</p>

      <div className="price">
        <span className="new">₹{product.price}</span>
        <span className="old">₹{product.oldPrice}</span>
      </div>

    </div>
  );
}

export default ProductInfo;