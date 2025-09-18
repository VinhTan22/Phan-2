const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

router.get("/", async (req, res) => {
  try {
    const { q, supplier } = req.query;
    let filter = {};

    if (q && q.trim() !== "") {
      filter.name = new RegExp(q, "i");
    }
    if (supplier && supplier !== "") {
      filter.supplier = supplier;
    }

    const suppliers = await Supplier.find();
    const products = await Product.find(filter).populate("supplier");

    res.render("index", {
      title: "Trang chủ",
      products,
      suppliers,
      q: q || "",
      supplier: supplier || ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
