import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { becomeTasker } from "../controllers/tasker.controller.js";

const router = express.Router();

router.post("/become", verifyToken, becomeTasker);

export default router;
