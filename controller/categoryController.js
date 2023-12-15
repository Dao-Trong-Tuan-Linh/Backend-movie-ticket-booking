import { StatusCodes } from "http-status-codes";
import { BadRequestError, ConflictUserError, CustomAPIError } from "../errors/index.js";
import categoryModel from "../model/category-model.js";



export const createCategoryController = async(req,res) => {
    const {name} = req.body
    if(!name) {
        throw new BadRequestError("Tên danh mục được yêu cầu")
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory) {
        throw new ConflictUserError('Tên danh mục đã tồn tại')
    }
    const category = await new categoryModel({name}).save()
    res.status(StatusCodes.CREATED).json({result:category})
}

//update category
export const updateCategoryController = async(req,res) => {
    const {name} = req.body
    const {id} = req.query
    
    const category = await categoryModel.findByIdAndUpdate(
        id,
        {name},
        {new:true}
    )
    if(category) {
        res.status(StatusCodes.OK).json({result:category})
    } else {
        throw new CustomAPIError('Lỗi trong khi xử lý')
    }
}

//get all category
export const allCategoriesController = async(req,res) => {
    const categories = await categoryModel.find({})
    if(categories) {
        res.status(StatusCodes.OK).json({result:categories})
    } else {
        throw new CustomAPIError('Lỗi trong khi tải')
    }
}

export const singleCategoryController = async(req,res) => {
    const {id} = req.query
    const category = await categoryModel.findById({_id:id})
    if(category) {
        res.status(StatusCodes.OK).json({result:category})
    } else {
        throw new CustomAPIError('Lỗi trong khi tải')
    }
}

//delete category
export const deleteCategoryController = async(req,res) => {
    const {id} = req.query
    const category = await categoryModel.findByIdAndDelete(id)
    if(category) {
        res.status(StatusCodes.OK).json({result:category})
    }else {
        throw new CustomAPIError('Lỗi trong khi xóa')
    }
}



