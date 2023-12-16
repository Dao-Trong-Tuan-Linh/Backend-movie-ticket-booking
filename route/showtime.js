import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { allShowTimesController, createShowtimeController, deleteShowtimeController, singleShowtimeController, updateShowtimeController, } from "../controller/showtimeController.js"
const route = express.Router()

route.route("/all-showtime").get(allShowTimesController)
route.route("/get-showtime").get(singleShowtimeController)
route.route("/create-showtime").post(requireSignIn,isAdmin,createShowtimeController)
route.route("/update-showtime/:id").put(requireSignIn,isAdmin,updateShowtimeController)
route.route("/delete-showtime/:id").delete(requireSignIn,isAdmin,deleteShowtimeController)

export default route