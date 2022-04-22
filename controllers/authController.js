import { request, response } from "express";

import User from "../models/User.js";

const register = async (req = request, res = response, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req = request, res = response) => {
  res.send("login");
};

const updateUser = async (req = request, res = response) => {
  res.send("updateUser");
};

export { register, login, updateUser };
