import { StatusCodes } from "http-status-codes";
import { ConflictUserError, CustomAPIError } from "../errors/index.js";
import menuModel from "../model/menu-model.js";

export const getMenuController = async (req, res) => {
  const menu = await menuModel.find({});
  if (menu) {
    res.status(StatusCodes.OK).json({ result: menu });
  } else {
    throw new Error("Lỗi trong khi tải...");
  }
};

export const getSingleMenuController = async (req, res) => {
  const { id } = req.query;
  const menu = await menuModel.findById(id);
  if (menu) {
    res.status(StatusCodes.OK).json({ result: menu });
  } else {
    throw new Error("Lỗi trong khi tải...");
  }
};

export const createMenuController = async (req, res) => {
  const { name, level, order, parentId, link } = req.body;

  if (!name) {
    throw new BadRequestError("Tên được yêu cầu");
  }
  if (!level) {
    throw new BadRequestError("Level được yêu cầu");
  }
  if (!order) {
    throw new BadRequestError("Order được yêu cầu");
  }

  const existingName = await menuModel.findOne({ name });
  if (existingName) {
    throw new ConflictUserError("Tên menu đã tồn tại");
  }

  const menuItem = await menuModel.create({
    name,
    level,
    order,
    parentID: parentId,
    link,
  });

  res.status(StatusCodes.CREATED).json(menuItem);
};

export const updateMenuController = async (req, res) => {
  const { id } = req.params;
  const { name, level, order, parentID, link } = req.body;
  console.log(req.body);
  if (!name) {
    throw new BadRequestError("Tên được yêu cầu");
  }
  if (!level) {
    throw new BadRequestError("Level được yêu cầu");
  }
  if (!order) {
    throw new BadRequestError("Order được yêu cầu");
  }
  const existingName = await menuModel.findOne({ name });
  if (existingName) {
    throw new ConflictUserError("Tên menu đã tồn tại");
  }

  const menu = await menuModel.findByIdAndUpdate(
    id,
    {
      name,
      level,
      order,
      parentID,
      link,
    },
    { new: true }
  );

  if (menu) {
    res.status(StatusCodes.OK).json({ result: menu });
  } else {
    throw new CustomAPIError("Lỗi trong khi xử lý");
  }
};

export const deleteMenuController = async (req, res) => {
  const { id } = req.params;
  const menu = await filmModel.findByIdAndDelete(id);
  if (menu) {
    res.status(StatusCodes.OK).json({ result: menu });
  } else {
    throw new CustomAPIError("Lỗi trong khi xóa");
  }
};
