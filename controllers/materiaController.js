import { request, response } from "express";

const createMateria = async (req = request, res = response) => {
  res.send("createMateria");
};

const getAllMaterias = async (req = request, res = response) => {
  res.send("getAllMaterias");
};

const updateMateria = async (req = request, res = response) => {
  res.send("updateMateria");
};

const deleteMateria = async (req = request, res = response) => {
  res.send("deleteMateria");
};

const showStats = async (req = request, res = response) => {
  res.send("showEstadisticas");
};

export {
  createMateria,
  getAllMaterias,
  updateMateria,
  deleteMateria,
  showStats,
};
