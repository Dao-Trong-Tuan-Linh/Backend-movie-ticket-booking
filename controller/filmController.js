import { StatusCodes } from "http-status-codes";
import filmModel from "../model/film-model.js";
import fs from "fs";
import CustomAPIError from "../errors/custom-api.js";

export const allFilmsController = async (req, res) => {
  const films = await filmModel.find({});
  if (films) {
    res.status(StatusCodes.OK).json({ result: films });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const getFilmsById = async (req,res) => {
  const allFilms = await filmModel.find({});
  if (allFilms) {
    const films = allFilms.map((film) => {[{id:film._id,name:film.name}]})
    res.status(StatusCodes.OK).json({ result: films });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
}

export const getFilmController = async (req, res) => {
  const { id } = req.query;
  const film = await filmModel.findById({ _id: id });
  if (film) {
    res.status(StatusCodes.OK).json({ result: film });
  } else {
    throw new CustomAPIError("Lỗi trong khi tải");
  }
};

export const createFilmController = async (req, res) => {
  const {
    name,
    director,
    actors,
    time,
    category,
    date,
    content,
    language,
    rated,
    trailer,
  } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const image = path + "." + ext;
  fs.renameSync(path, image);
  console.log(req.body, image);
  const film = await new filmModel({
    name: name,
    director: director,
    actors: actors,
    time: Number(time),
    category: category,
    date: date,
    content: content,
    language: language,
    rated: rated,
    trailer: trailer,
    image: image,
  }).save();

  if (film) {
    res.status(StatusCodes.CREATED).json({ result: film });
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const updateFilmController = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    director,
    actors,
    time,
    category,
    date,
    content,
    language,
    rated,
    trailer,
  } = req.body;
  const film = await filmModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  if (film) {
    res.status(StatusCodes.CREATED).json({ result: film });
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const deleteFilmController = async (req, res) => {
  const { id } = req.params;
  const film = await filmModel.findByIdAndDelete(id);
  if (film) {
    res.status(StatusCodes.OK).json({result:film});
  } else {
    throw new CustomAPIError("Lỗi trong khi xóa");
  }
};
