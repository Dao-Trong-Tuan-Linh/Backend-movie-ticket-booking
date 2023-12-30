import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { createOrderController } from "../controller/orderController.js"


const route = express.Router()

route.route("/create-order").post(requireSignIn,createOrderController)


export default route