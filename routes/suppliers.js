const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Web routes (render EJS)
router.get("/", supplierController.index);
router.get("/new", supplierController.newForm);
router.post("/new", supplierController.create);
router.get("/:id/edit", supplierController.editForm);
router.post("/:id/edit", supplierController.update);
router.get("/:id/delete", supplierController.delete);

// API routes (JSON cho Postman)
router.get("/api", supplierController.apiList);
router.post("/api", supplierController.apiCreate);
router.put("/api/:id", supplierController.apiUpdate);
router.delete("/api/:id", supplierController.apiDelete);

module.exports = router;
