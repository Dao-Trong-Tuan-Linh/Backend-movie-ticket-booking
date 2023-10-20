import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  changePasswordController,
} from "../controller/authController.js";

const route = express.Router();
route.route("/register").post(registerController);
route.route("/login").post(loginController);
route.route("/forgot-password").post(forgotPasswordController);
route.route("/change-password/:id").post(changePasswordController);
export default route;
