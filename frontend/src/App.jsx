import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import SavedItems from "./components/SavedItems";
import API from "./api";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));

  useEffect(() => {
    fetchProducts();
    if (cartId) fetchCart(cartId);
  }, [cartId]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCart = async (id) => {
    try {
      const res = await API.get(`/api/cart/${id}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      let res;
      if (cartId) {
        res = await API.post(`/api/cart/${cartId}/add`, { productId, quantity: 1 });
      } else {
        res = await API.post(`/api/cart/new`, { productId, quantity: 1 });
        const newCart = res.data.cart;
        setCartId(newCart._id);
        localStorage.setItem("cartId", newCart._id);
      }
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await API.delete(`/api/cart/${cartId}/remove/${itemId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const res = await API.patch(`/api/cart/${cartId}/update/${itemId}`, { quantity });
      setCart(res.data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const toggleSave = async (itemId) => {
    try {
      const res = await API.patch(`/api/cart/${cartId}/save/${itemId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };


  const savedItems = cart?.items?.filter((item) => item.savedForLater) || [];
  const activeCart = cart ? { ...cart, items: cart.items.filter((item) => !item.savedForLater) } : null;

  return (
    <div className="container">
      <h2> Shopping Cart</h2>
      <ProductList products={products} handleAddToCart={handleAddToCart} />
      {activeCart && (
        <Cart
          cart={activeCart}
          handleRemove={handleRemove}
          handleQuantityChange={handleQuantityChange}
          toggleSave={toggleSave}
        />
      )}
      {savedItems.length > 0 && (
       <SavedItems
       items={cart.items.filter((item) => item.savedForLater)}
       toggleSave={toggleSave}
       handleRemove={handleRemove}
     />
     
      )}
    </div>
  );
}

export default App;
