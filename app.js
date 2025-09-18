const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo"); 
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session (dùng MongoDB)
app.use(
  session({
    secret: "mySecretKey", // đổi thành chuỗi bí mật riêng
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/SessionAuth",
      ttl: 60 * 60, // 1 giờ
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 giờ
  })
);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Middleware set title mặc định
app.use((req, res, next) => {
  res.locals.title = "MyShop MVC";
  next();
});

// Routes
const supplierRoutes = require("./routes/suppliers");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.render("index", { title: "Trang chủ" }));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/MyShop")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.stack);
  res.status(500).json({
    message: "Lỗi server",
    error: err.message,
  });
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
