import express from 'express';
import { createForm, getUserForms } from '../controllers/healthStatus.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const healthRoute = express.Router();


healthRoute.post('/health-status',protectRoute,  createForm);
healthRoute.get('/health-status', protectRoute,  getUserForms);
 
export default healthRoute;
