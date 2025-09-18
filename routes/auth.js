const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });

    user = new User({ username, password });
    await user.save();

    res.json({
      message: "Đăng ký thành công",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    // Lưu session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.json({
      message: "Đăng nhập thành công",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// Đăng xuất
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Không thể đăng xuất" });
    res.clearCookie("connect.sid");
    res.json({ message: "Đăng xuất thành công" });
  });
});

// 🔹 Lấy thông tin user hiện tại
router.get("/profile", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  res.json({
    user: { id: req.session.userId, username: req.session.username },
  });
});

module.exports = router;
