const Supplier = require("../models/supplier");

// Web: danh sách NCC (render EJS)
exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/index", { suppliers });
};

// API: danh sách NCC (JSON cho Postman)
exports.apiList = async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
};

// Form thêm NCC
exports.newForm = (req, res) => {
  res.render("suppliers/api");
};

// Lưu NCC mới
exports.create = async (req, res) => {
  await Supplier.create(req.body);
  res.redirect("/suppliers");
};

// API thêm NCC (cho Postman)
exports.apiCreate = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Form sửa
exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("suppliers/api", { supplier });
};

// Cập nhật NCC
exports.update = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/suppliers");
};

// API update
exports.apiUpdate = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa NCC
exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect("/suppliers");
};

// API xóa NCC
exports.apiDelete = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
