import users from "../model/user.js";
import {
  BadRequestError,
  ConflictUserError,
  UnauthorizedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import {
  hashPassword,
  comparePassword,
} from "../middleware/handle-password.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerController = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name) {
    throw new BadRequestError("Tên được yêu cầu");
  }
  if (name.length < 3) {
    throw new BadRequestError("Tên cần lớn hơn hoặc bằng 3 ký tự");
  }
  if (!email) {
    throw new BadRequestError("Email được yêu cầu");
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailRegex)) {
    throw new BadRequestError("Email không hợp lệ");
  }
  if (!password) {
    throw new BadRequestError("Mật khẩu được yêu cầu");
  }
  if (password.length < 6) {
    throw new BadRequestError("Mật khẩu cần lớn hơn hoặc bằng 6 ký tự");
  }
  if (!phone) {
    throw new BadRequestError("Số điện thoại được yêu cầu");
  }
  if (phone.length < 10) {
    throw new BadRequestError("Số điện thoại không hợp lệ");
  }

  const existingName = await users.findOne({ name });
  const existingEmail = await users.findOne({ email });
  if (existingName || existingEmail) {
    throw new ConflictUserError("Tài khoản đã tồn tại");
  }

  const hashedPassword = await hashPassword(password);
  const user = await users.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ result: { name: user.name, email: user.email } });
};

export const loginController = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError("Xin cung cấp tên và mật khẩu");
  }
  const user = await users.findOne({ name });
  if (!user) {
    throw new ConflictUserError("Tên không trùng với tên tài khoản");
  }
  const isPassword = await comparePassword(password, user.password);
  if (!isPassword) {
    throw new ConflictUserError("Mật khẩu không trùng với tài khoản");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });
  res.status(StatusCodes.OK).json({ result:{token:token,user:{name:user.name,email:user.email}} });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Mời bạn nhập email của mình");
  }
  const findUser = await users.findOne({ email });
  if (!findUser) {
    throw new BadRequestError("Không tìm thấy");
  }

  //email config
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Email lấy lại mật khẩu",
    text: `Đây là link để lấy lại mật khẩu http://localhost:3000/password-retrieval/${findUser._id}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email không gửi được" });
    } else {
      res.status(StatusCodes.OK).json({ msg: "Email đã gửi thành công" });
    }
  });
};

export const changePasswordController = async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  const validUser = await users.findOne({ _id: id });
  if (!validUser) {
    throw new UnauthorizedError("Không tìm thấy người dùng");
  }
  if (password !== confirmPassword) {
    throw new BadRequestError("2 mật khẩu không trùng nhau");
  }
  if (password.length < 6) {
    throw new BadRequestError("Mật khẩu phải lớn hơn hoặc bằng 6 ký tự");
  }
  const hashedPassword = await hashPassword(password);
  const updateUser = await users.findByIdAndUpdate(
    { _id: id },
    { password: hashedPassword }
  );
  res.status(StatusCodes.OK).json({ result: {name:updateUser.name,email:updateUser.email} });
};
