import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credential");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credential");
  }
  const token = user.createJWT();
  // le pongo undefined al password asi no lo devuelva en la res
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req = request, res = response) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // En el video le gusta devolver un token nuevo para la modificación
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
