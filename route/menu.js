import express from "express";
import { getMenuController,createMenuController, getSingleMenuController, updateMenuController, deleteMenuController} from "../controller/menuController.js";
import { isAdmin, requireSignIn } from "../middleware/auth-middleware.js";


const route = express.Router();

route.route("/get-menus").get(getMenuController);
route.route("/create-menu").post(requireSignIn,isAdmin,createMenuController)
route.route("/get-menu").get(requireSignIn,isAdmin,getSingleMenuController)
route.route("/update-menu/:id").put(requireSignIn,isAdmin,updateMenuController)
route.route("/delete-menu/:id").delete(requireSignIn,isAdmin,deleteMenuController)

export default route;
