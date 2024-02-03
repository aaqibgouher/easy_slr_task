const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// get me
router.get("/me", isAuthenticated, userController.getMe);

// update profile
router.put("/profile", isAuthenticated, userController.updateProfile);

// logout
router.get("/logout", isAuthenticated, userController.logout);

// export
module.exports = router;
