import { StatusCodes } from "http-status-codes";
import { ConflictUserError } from "../errors/index.js";
import menu from "../model/menu-model.js";

export const getMenuController = async (req,res) => {

}

export const createMenuController = async (req,res) => {
    const {name,level,order,parentId,link} = req.body
    if(!name) {
        throw new BadRequestError("Tên được yêu cầu");
    }
    if(!level) {
        throw new BadRequestError("Level được yêu cầu");
    }
    if(!order) {
        throw new BadRequestError("Order được yêu cầu");
    }

    const existingName = await menu.findOne({name})
    if(existingName) {
        throw new ConflictUserError("Tên menu đã tồn tại")
    }
    const menuItem = await menu.create({
        name,
        level,
        order,
        parentID:parentId ? parentId : "0",
        link:link ? link : ""
    })

    res.status(StatusCodes.CREATED).json(menuItem)

}