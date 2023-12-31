import { StatusCodes } from "http-status-codes";
import { ConflictUserError, CustomAPIError } from "../errors/index.js";
import orderModel from "../model/order-model.js";

export const createOrderController = async (req, res) => {
  const { filmId, seats,date,time, total } = req.body;
  console.log(filmId,seats,date,time,total)
  const {id} = req.user
  console.log(id)
  const order = await new orderModel({
    userId:id,
    filmId,
    seats,
    date,
    time,
    total
  }).save();

  if (order) {
    res.status(StatusCodes.CREATED).json({ result:'Đã đặt vé thành công'});
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const getOrdersByUserController = async(req,res) => {
  const {id} = req.user
  
  const orders = await orderModel.find({userId:id}).populate('filmId').sort({createdAt:1})
  const data = orders.map(o => ({_id:o._id,filmName:o.filmId.name,startDate:o.date,startTime:o.time,seats:o.seats.map(item => ({name:item.name}))}))

  if (orders) {
    res.status(StatusCodes.OK).json({ result: data });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
}


