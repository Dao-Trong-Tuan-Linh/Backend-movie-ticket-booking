import { StatusCodes } from "http-status-codes";
import { ConflictUserError, CustomAPIError } from "../errors/index.js";
import orderModel from "../model/order-model.js";

export const createOrderController = async (req, res) => {
  const { filmId, seats, total } = req.body;
  console.log(filmId,seats,total)
  const {id} = req.user
  console.log(id)
  const order = await new orderModel({
    userId:id,
    filmId,
    seats,
    total
  }).save();

  if (order) {
    res.status(StatusCodes.CREATED).json({ result:'Đã đặt vé thành công'});
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};


