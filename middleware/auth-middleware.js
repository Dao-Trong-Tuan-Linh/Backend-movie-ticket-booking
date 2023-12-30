import jwt from "jsonwebtoken";
import userModel from "../model/user-model.js";
import { UnauthorizedError } from "../errors/index.js";

//Protected Routes token base
export const requireSignIn = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    console.log(decode)
    next();
  } else {
    throw new UnauthorizedError("Authentication token must be provided");
  }
};

//Admin Access
export const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  if (user.role !== 1) {
    throw new UnauthorizedError("Người dùng không hợp lệ");
  } else {
    next();
  }
};
