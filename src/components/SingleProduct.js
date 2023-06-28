
import { Link } from "react-router-dom";
import "./SingleProduct.css"; 

const SingleProduct = ({ product1 }) => {
  const { img, title, brand, price } = product1;
  return (
    <div className="single-product">
      <div className="product-image">
        <img
          className="product-img"
          src={img}
          alt={title}
        />
      </div>
      <Link
        to='/display'
        state={product1}
        className="product-link"
      >
        <h2 className="product-title">
          {product1.title.slice(0, 20)}
        </h2>
      </Link>
      <p className="product-brand">
        Brand: <span className="brand-name">{brand}</span>
      </p>
      <p className="product-price">
        Price: <span className="price-value">{price}</span>
      </p>
      <div className="product-buttons">
      </div>
    </div>
  );
};

export default SingleProduct;
