const express =require('express');
const allProduct = require('../controllers/product');
const router=express.Router();
router.route('/products').get(allProduct)
module.exports=router;