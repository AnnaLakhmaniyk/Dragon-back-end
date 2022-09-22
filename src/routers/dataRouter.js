const express = require("express");
const router = new express.Router();
const { getData, getDataById } = require("../controllers/controllersData");
router.get("/", getData);
router.get("/:id", getDataById);

module.exports = router;
