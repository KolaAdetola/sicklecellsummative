import express from "express";
import { submitPainLog } from "../controllers/painLog.controller.js";

const router = express.Router();

router.post("/log", submitPainLog);

export default router;
