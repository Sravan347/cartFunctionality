const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB/connect");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();

// app.get("/test", (req, res) => {
//   res.send("Test working");
// });
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",productRouter);
app.use('/api/cart' , cartRouter)

const PORT = process.env.PORT || 6000;

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`The server is working on port no: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();