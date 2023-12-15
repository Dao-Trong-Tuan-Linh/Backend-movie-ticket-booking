import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { allCategoriesController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js"

const route = express.Router()

route.route("/get-categories").get(allCategoriesController)
route.route("/get-category").get(singleCategoryController)
route.route("/create-category").post(requireSignIn,isAdmin,createCategoryController)
route.route("/update-category").put(requireSignIn,isAdmin,updateCategoryController)
route.route("/delete-category").delete(requireSignIn,isAdmin,deleteCategoryController)

export default route
