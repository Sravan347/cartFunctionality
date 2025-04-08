const Products = require("../models/Products");

const allProduct = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({message:"successful" ,products});
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = allProduct;
