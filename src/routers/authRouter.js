const express = require("express");
const router = new express.Router();
const {
  registrationController,
  loginController,
  logoutControlls,
  currentControlls,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddeleware");
const { validateAuth } = require("../middlewares/validationMiddleware");
router.post("/registration", validateAuth, registrationController);
router.post("/login", validateAuth, loginController);
router.post("/logout", authMiddleware, logoutControlls);
router.post("/current", authMiddleware, currentControlls);

module.exports = router;
