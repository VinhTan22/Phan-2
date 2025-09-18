const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Web routes
router.get("/", productController.index);
router.get("/new", productController.newForm);
router.post("/new", productController.create);
router.get("/:id/edit", productController.editForm);
router.post("/:id/edit", productController.update);
router.get("/:id/delete", productController.delete);

// API routes
router.get("/api", productController.apiList);
router.post("/api", productController.apiCreate);
router.put("/api/:id", productController.apiUpdate);
router.delete("/api/:id", productController.apiDelete);

module.exports = router;
