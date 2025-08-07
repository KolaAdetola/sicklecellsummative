import express from "express";

import { addCareTaker,getAllCareTakers,getCareTaker } from "../controllers/careTaker.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const careTakerRoutes = express.Router();
// Route to add a caretaker
careTakerRoutes.post("/add", protectRoute, addCareTaker);
// Route to get all caretakers
careTakerRoutes.get("/:phone", protectRoute, getCareTaker);
// Route to get all caretakers
careTakerRoutes.get("/", protectRoute, getAllCareTakers);

export default careTakerRoutes;