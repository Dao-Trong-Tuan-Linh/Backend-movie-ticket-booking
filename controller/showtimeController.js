import { StatusCodes } from "http-status-codes";
import { ConflictUserError, CustomAPIError } from "../errors/index.js";
import showtimeModel from "../model/showtime-model.js";
import filmModel from "../model/film-model.js";

export const allShowTimesController = async (req, res) => {
  const allShowtime = await showtimeModel.find({}).sort({ date: 1, time: 1 });
  if (allShowtime) {
    res.status(StatusCodes.OK).json({ result: allShowtime });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const getTimesController = async(req,res) => {
  const {filmId,date} = req.query
  const showtime = await showtimeModel.find({
    filmId:filmId,
    date:date
  })
  const times = showtime.map(item => ({time:item.time}))
  if (times) {
    res.status(StatusCodes.OK).json({ result:times});
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
}

export const rowNowShowingController = async (req, res) => {
  const currentDate = new Date();
  const targetDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
  }-${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`;
  console.log(targetDate);
  const nowShowingShowtime = await showtimeModel.aggregate([
      {
        $match: {
          date: targetDate,
        },
      },
      {
        $group: {
          _id: "$filmId",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $eq: 1 },
        },
      },
      {
        $limit: 4
      }
    ])
    .exec();

  const filmIds = nowShowingShowtime.map(item => item._id)
  const films = await filmModel.find({_id:{$in:filmIds}})  
  const nowShowing = films.map(film => ({_id:film._id,name:film.name,image:film.image}))
  if (nowShowing) {
    res.status(StatusCodes.OK).json({ result: nowShowing });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const rowComingSoonController = async (req, res) => {
  const currentDate = new Date();
  const targetDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
  }-${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`;
  console.log(targetDate);
  const films = await filmModel.find({date:{$gt:targetDate}}).limit(4).sort({date:1})
  const row = films.map(film => ({_id:film._id,name:film.name,image:film.image}))
  if (row) {
    res.status(StatusCodes.OK).json({ result:row});
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const nowShowingController = async (req, res) => {
  const currentDate = new Date();
  const targetDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
  }-${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`;

  const nowShowingShowtime = await showtimeModel.aggregate([
      {
        $match: {
          date:{$gte:targetDate}
        },
      },
      {
        $group: {
          _id: "$filmId",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $eq: 1 },
        },
      },
    ])
    .exec();

  const filmIds = nowShowingShowtime.map(item => item._id)
  const films = await filmModel.find({_id:{$in:filmIds}})  
  const nowShowing = films.map(film => ({_id:film._id,name:film.name,image:film.image,category:film.category}))
  if (nowShowing) {
    res.status(StatusCodes.OK).json({ result: nowShowing });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const comingSoonController = async (req, res) => {
  const currentDate = new Date();
  const targetDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  
  const films = await filmModel.find({date:{$gt:targetDate}}).sort({date:1})
  const comingSoon = films.map(film => ({_id:film._id,name:film.name,image:film.image,category:film.category}))
  if (comingSoon) {
    res.status(StatusCodes.OK).json({ result:comingSoon});
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const singleShowtimeController = async (req, res) => {
  const { id } = req.query;
  const showtime = await showtimeModel.findById({ _id: id });
  if (showtime) {
    res.status(StatusCodes.OK).json({ result: showtime });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

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

export const updateShowtimeController = async (req, res) => {
  const { id } = req.params;

  const showtime = await showtimeModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  if (showtime) {
    res.status(StatusCodes.OK).json({ result: showtime });
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const deleteShowtimeController = async (req, res) => {
  const { id } = req.params;
  const showtime = await showtimeModel.findByIdAndDelete(id);
  if (showtime) {
    res.status(StatusCodes.OK).json({ result: id });
  } else {
    throw new CustomAPIError("Lỗi trong khi xóa");
  }
};
