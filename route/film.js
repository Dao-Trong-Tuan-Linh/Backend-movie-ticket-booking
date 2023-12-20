import express from "express"
import { isAdmin,requireSignIn } from "../middleware/auth-middleware.js"
import { createFilmController,allFilmsController,getFilmController, updateFilmController, deleteFilmController } from "../controller/filmController.js"
import multer from "multer"
const upload = multer({ dest: 'uploads/' })

const route = express.Router()

route.route("/all-films").get(requireSignIn,isAdmin,allFilmsController)
route.route("/get-film").get(getFilmController)
route.route("/create-film").post(requireSignIn,isAdmin,upload.single('file'),createFilmController)
route.route("/update-film/:id").put(requireSignIn,isAdmin,updateFilmController)
route.route("/delete-film/:id").delete(requireSignIn,isAdmin,deleteFilmController)

export default route