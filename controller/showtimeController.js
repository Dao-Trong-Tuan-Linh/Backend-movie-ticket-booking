import { StatusCodes } from "http-status-codes";
import { ConflictUserError, CustomAPIError } from "../errors/index.js";
import showtimeModel from "../model/showtime-model.js";

export const allShowTimesController = async (req, res) => {
  const allShowtime = await showtimeModel.find({})
  if (allShowtime) {
    res.status(StatusCodes.OK).json({ result:allShowtime});
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const singleShowtimeController = async (req, res) => {};

export const createShowtimeController = async (req, res) => {
  const { filmId, date, time, money } = req.body;
  const showtime = await new showtimeModel({
    filmId,
    date,
    time,
    money,
  }).save();
  if (showtime) {
    res.status(StatusCodes.CREATED).json({ result: showtime });
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const updateShowtimeController = async (req, res) => {};

export const deleteShowtimeController = async (req, res) => {};
