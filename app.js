require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Home Page - CRUD Suppliers & Products");
});

// Lấy PORT từ .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
