import React from "react";
import "./Cart.css";

const SavedItems = ({ items = [], toggleSave, handleRemove }) => {
  return (
    <div className="saved-items">
      <h2>Saved for Later</h2>
      {items.length === 0 ? (
        <p>No items saved for later.</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item._id}>
            <div>
              <strong>{item.product?.name || "Unnamed Product"}</strong>
              <p>Price: ₹{item.product?.price || 0}</p>
            </div>
            <div className="cart-buttons">
              <button onClick={() => toggleSave(item._id)}>Move to Cart</button>
              <button onClick={() => handleRemove(item._id)} className="remove">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedItems;
