const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.getAllUsers);
router
  .route("/:id")
  .get(authController.getUserById)
  .patch(authController.updateUserById)
  .delete(authController.deleteUserById);
router.route("/login").post(authController.loginUser);
router.route("/register").post(authController.createUser);

module.exports = router;
