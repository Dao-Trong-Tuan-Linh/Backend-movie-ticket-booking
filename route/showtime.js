import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { allShowTimesController, rowComingSoonController, createShowtimeController, deleteShowtimeController, rowNowShowingController, singleShowtimeController, updateShowtimeController, nowShowingController, comingSoonController, getTimesController, } from "../controller/showtimeController.js"
const route = express.Router()

route.route("/all-showtime").get(allShowTimesController)
route.route("/get-times").get(getTimesController)
route.route("/row-now-showing").get(rowNowShowingController)
route.route("/row-coming-soon").get(rowComingSoonController)
route.route("/now-showing").get(nowShowingController)
route.route("/coming-soon").get(comingSoonController)
route.route("/get-showtime").get(singleShowtimeController)
route.route("/create-showtime").post(requireSignIn,isAdmin,createShowtimeController)
route.route("/update-showtime/:id").put(requireSignIn,isAdmin,updateShowtimeController)
route.route("/delete-showtime/:id").delete(requireSignIn,isAdmin,deleteShowtimeController)

export default route