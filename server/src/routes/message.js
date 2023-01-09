import Express from "express";
import { index } from "../controllers/message.js";

const router = Express.Router();

router.get("/:userid", index);

export default router;
