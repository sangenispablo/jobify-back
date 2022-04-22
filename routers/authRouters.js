import { Router } from "express";

import { login, register, updateUser } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateuser").put(updateUser);

export default router;
