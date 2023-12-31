import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { createOrderController, getOrdersByUserController } from "../controller/orderController.js"


const route = express.Router()

route.route("/create-order").post(requireSignIn,createOrderController)
route.route("/get-orders-by-user").get(requireSignIn,getOrdersByUserController)

export default route