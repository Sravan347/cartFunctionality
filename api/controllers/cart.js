const Cart = require("../models/Cart");
const Products = require("../models/Products");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart;
    if (req.params.cartId === "new") {
      cart = new Cart({ items: [{ product: productId, quantity }] });
    } else {
      cart = await Cart.findById(req.params.cartId);
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Added to cart", cart: await cart.populate("items.product") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const removeItem = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();

    res.json(await cart.populate("items.product"));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const toggleSaveForLater = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.savedForLater = !item.savedForLater;
    await cart.save();

    res.json(await cart.populate("items.product"));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = {
  getCart,
  addToCart,
  updateItemQuantity,
  removeItem,
  toggleSaveForLater,
};
