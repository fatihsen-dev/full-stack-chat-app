import express from "express";
import { register, index, login } from "../controllers/user.js";

const router = express.Router();

router.get("/", index);
router.get("/login", login);
router.post("/register", register);

export default router;
