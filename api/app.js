const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB/connect");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const cors = require("cors");
const bodyParser = require("body-parser");


dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://your-frontend.onrender.com"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", productRouter);
app.use("/api/cart", cartRouter);

app.get("/test", (req, res) => {
  res.send("Backend is running ✅");
});


const PORT = process.env.PORT || 7000;

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server error:", error);
  }
};

server();
