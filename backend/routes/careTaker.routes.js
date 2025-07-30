import express from "express";

import { addCareTaker,getCareTaker } from "../controllers/careTaker.controller.js";

const careTakerRoutes = express.Router();
// Route to add a caretaker
careTakerRoutes.post("/add", addCareTaker);
// Route to get all caretakers
careTakerRoutes.get("/:phone", getCareTaker);


export default careTakerRoutes; 