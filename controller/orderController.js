import { StatusCodes } from "http-status-codes";
import { BadRequestError, ConflictUserError, CustomAPIError } from "../errors/index.js";
import orderModel from "../model/order-model.js";

export const allOrdersController = async(req,res) => {
  const orders = await orderModel.find({}).populate('userId').populate('filmId').sort({createdAt:-1})
  const allOrders = orders.map(o => ({_id:o._id,filmName:o.filmId.name,username:o.userId.name,total:o.total,createdAt:o.createdAt}))
  if(allOrders) {
    res.status(StatusCodes.OK).json({ result: allOrders });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
}

export const createOrderController = async (req, res) => {
  const { filmId, seats,date,time, total } = req.body;
  
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
  const current = new Date()
  const currentDate = `${current.getFullYear()}-${current.getMonth()+1 < 10 ? `0${current.getMonth()+1}` : `${current.getMonth()+1}`}-${current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`}`
  const currentTime = `${current.getHours() < 10 ? `0${current.getHours()}` : `${current.getHours()}`}:${current.getMinutes() < 10 ? `0${current.getMinutes()}` : `${current.getMinutes()}`}`

  if(currentDate == date && time < currentTime) {
    throw new BadRequestError('Xin lỗi.Phim đã được chiếu')
  }
  if (order) {
    res.status(StatusCodes.CREATED).json({ result:'Đã đặt vé thành công'});
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const getOrdersByUserController = async(req,res) => {
  const {id} = req.user
  
  const orders = await orderModel.find({userId:id}).populate('filmId').sort({createdAt:-1})
  const data = orders.map(o => ({_id:o._id,filmName:o.filmId.name,startDate:o.date,startTime:o.time,seats:o.seats.map(item => ({name:item.name}))}))

  if (orders) {
    res.status(StatusCodes.OK).json({ result: data });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
}


