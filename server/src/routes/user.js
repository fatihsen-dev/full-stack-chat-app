import express from "express";
import { register, index, login, Control } from "../controllers/user.js";

const router = express.Router();

router.get("/", index);
router.post("/login", login);
router.post("/register", register);
router.post("/control", Control);

export default router;
