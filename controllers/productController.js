const Product = require("../models/product");
const Supplier = require("../models/supplier");

// Web: danh sách SP
exports.index = async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.render("products/index", { products });
};

// API: danh sách SP (JSON)
exports.apiList = async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.json(products);
};

// Form thêm mới
exports.newForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/api", { suppliers });
};

// Lưu SP mới
exports.create = async (req, res) => {
  await Product.create(req.body);
  res.redirect("/products");
};

// API thêm SP
exports.apiCreate = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Form sửa
exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render("products/api", { product, suppliers });
};

// Cập nhật SP
exports.update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/products");
};

// API update
exports.apiUpdate = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa SP
exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};

// API xóa SP
exports.apiDelete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
