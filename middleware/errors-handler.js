import {StatusCodes} from "http-status-codes"
import CustomAPIError from "../errors/custom-api.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
      console.log(err)
      return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default errorHandlerMiddleware