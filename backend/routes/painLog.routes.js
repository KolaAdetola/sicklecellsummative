import express from "express";
import { getPainLogs, submitPainLog } from "../controllers/painLog.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/log", protectRoute, submitPainLog);
router.get("/logs", protectRoute, getPainLogs);

// Export the router
 
export default router;
