const mongoose = require('mongoose');
const Products = require('./models/Products');
require('dotenv').config(); 
const url = process.env.MONGO_URL;

mongoose.connect(url)
.then(() => {
  console.log('✅ Connected to MongoDB');
  
  const products = [
    {
      name: 'Smartphone',
      price: 10000,
      description: 'Latest smartphone with great features',
      image: 'https://example.com/smartphone.jpg'
    },
    {
      name: 'Laptop',
      price: 20000,
      description: 'Powerful laptop for work and play',
      image: 'https://example.com/laptop.jpg'
    }
  ];

  return Products.insertMany(products);
})
.then(() => {
  console.log(' Products seeded successfully');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Product seeds Error:', err);
  mongoose.connection.close();
});
