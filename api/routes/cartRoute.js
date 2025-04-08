const express = require("express");
const {
  getCart,
  addToCart,
  updateItemQuantity,
  removeItem,
  toggleSaveForLater,
} = require("../controllers/cart");

const router = express.Router();


router.post("/new", addToCart);

router.get("/:cartId", getCart);
router.post("/:cartId/add", addToCart);
router.patch("/:cartId/update/:itemId", updateItemQuantity);
router.delete("/:cartId/remove/:itemId", removeItem);
router.patch("/:cartId/save/:itemId", toggleSaveForLater);

module.exports = router;

