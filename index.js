import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import 'express-async-errors'
import auth from "./route/auth.js"
import menu from "./route/menu.js"
import category from "./route/category.js"
import film from "./route/film.js"
import showtime from "./route/showtime.js"
import morgan from "morgan"
import cors from "cors"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//errors handler
import errorHandlerMiddleware from "./middleware/errors-handler.js"
import notFound from "./middleware/not-found.js"

//configure env
dotenv.config()

//database config
connectDB()
//rest object
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));


//routes
app.use('/api/v1',auth)
app.use('/api/v1',menu)
app.use('/api/v1',category)
app.use('/api/v1',film)
app.use('/api/v1',showtime)
//rest api
app.get('/',(req,res) => {
    res.send('This is movie-ticket-booking api')
})

//Message when api errors
app.use(errorHandlerMiddleware)
app.use(notFound)


const port = process.env.PORT

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`)
})