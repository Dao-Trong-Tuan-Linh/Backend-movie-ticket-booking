import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import 'express-async-errors'
import auth from "./route/auth.js"
import morgan from "morgan"
import cors from "cors"


//errors handler
import errorHandlerMiddleware from "./middleware/errors-handler.js"
import notFound from "./middleware/not-found.js"

//configure env
dotenv.config()

//database config
connectDB()
//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())



//routes
app.use('/api/v1',auth)

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