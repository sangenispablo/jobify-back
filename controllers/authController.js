import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

const register = async (req = request, res = response) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req = request, res = response) => {
  res.send("login");
};

const updateUser = async (req = request, res = response) => {
  res.send("updateUser");
};

export { register, login, updateUser };
