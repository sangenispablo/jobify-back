import { request, response } from "express";

const createJob = async (req = request, res = response) => {
  res.send("createJob");
};

const getAllJobs = async (req = request, res = response) => {
  res.send("getAllJobs");
};

const updateJob = async (req = request, res = response) => {
  res.send("updateJob");
};

const deleteJob = async (req = request, res = response) => {
  res.send("deleteJob");
};

const showStats = async (req = request, res = response) => {
  res.send("showStats");
};

export {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
};
