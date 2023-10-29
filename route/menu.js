import express from "express";
import { getMenuController,createMenuController} from "../controller/menuController.js";
import { isAdmin, requireSignIn } from "../middleware/auth-middleware.js";


const route = express.Router();

route.route("/get-menu").get(getMenuController);
route.route("/create-menu").post(requireSignIn,isAdmin,createMenuController)
export default route;
