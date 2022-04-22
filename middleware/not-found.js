import { response } from "express";

const notFoundMiddleware = (req, res = response) => {
  res.status(404).send("Route does not exists");
};

export default notFoundMiddleware;
