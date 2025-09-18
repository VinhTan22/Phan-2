const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Middleware để set title mặc định
app.use((req, res, next) => {
  res.locals.title = "MyShop MVC"; 
  next();
});

// Routes
const supplierRoutes = require("./routes/suppliers");
const productRoutes = require("./routes/products");

app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => res.render("index", { title: "Trang chủ" }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
