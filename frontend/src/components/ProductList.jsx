import React from "react";
import "./ProductList.css";

const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <h3>{product.name}</h3>
          <p>₹ {product.price}</p>
          <button onClick={() => handleAddToCart(product._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
