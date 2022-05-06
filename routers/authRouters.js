import { Router } from "express";

import { login, register, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = Router();

// publicas
router.route("/register").post(register);
router.route("/login").post(login);
// privadas
router.route("/updateuser").put(authenticateUser, updateUser);

export default router;
