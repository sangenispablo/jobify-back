import { Router } from "express";

import {
  createMateria,
  deleteMateria,
  getAllMaterias,
  updateMateria,
  showStats,
} from "../controllers/materiaController.js";

const router = Router();

router.route("/").post(createMateria).get(getAllMaterias);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteMateria).put(updateMateria);

export default router;
