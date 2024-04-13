const express = require("express");
const userController = require("../controllers/user");

const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/profile", verify, userController.profile);

router.get("/users", verify, userController.getUsers);

module.exports = router;