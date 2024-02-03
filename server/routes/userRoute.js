const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// add user
router.post("/", userController.addUser);

// get all users added by admin
router.get("/", userController.getUsers);

// export
module.exports = router;
