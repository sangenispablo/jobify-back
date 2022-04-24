import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import { BadRequestError } from "../errors/index.js";

import User from "../models/User.js";

const register = async (req = request, res = response) => {
  // saco las variables del body
  const { name, email, password } = req.body;

  // Chequeo que no esten vacias
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // Verifico que no exista el email
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("El email ya existe con otro usuario");
  }
  // Creo una instancia de User y la guardo
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
};

const login = async (req = request, res = response) => {
  res.send("login");
};

const updateUser = async (req = request, res = response) => {
  res.send("updateUser");
};

export { register, login, updateUser };
