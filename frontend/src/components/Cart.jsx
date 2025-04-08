import React from "react";
import "./Cart.css";

const Cart = ({ cart, handleRemove, handleQuantityChange, toggleSave }) => {
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <div className="cart-details">
              <strong>{item.product?.name || "Unnamed Product"}</strong>
              <p>Price: ₹{item.product?.price || 0}</p>
              <p>
                Qty:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => {
                    const qty = Math.max(1, parseInt(e.target.value) || 1);
                    handleQuantityChange(item._id, qty);
                  }}
                />
              </p>
              <p>
                Subtotal: ₹
                {(item.product?.price || 0) * item.quantity}
              </p>
            </div>
            <div className="cart-buttons">
              <button onClick={() => toggleSave(item._id)}>
                {item.savedForLater ? "Move to Cart" : "Save for Later"}
              </button>
              <button onClick={() => handleRemove(item._id)} className="remove">
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹{calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
