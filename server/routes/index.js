const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// import routes
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const projectRoute = require("./projectRoute");

router.use("/auth", authRoute);
router.use("/user", [isAuthenticated, isAdmin], userRoute);
router.use("/project", isAuthenticated, projectRoute);

module.exports = router;
