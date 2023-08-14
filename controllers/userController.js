import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();

  res.status(StatusCodes.OK).json({ users });
};

export const updateUser = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const newUser = { ...req.body };
  delete newUser.password;
  const updatedUser = await User.findByIdAndUpdate(userId, newUser);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
