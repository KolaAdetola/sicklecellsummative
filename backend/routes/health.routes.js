import express from 'express';
import { createForm, getUserForms } from '../controllers/healthStatus.controller.js';

const healthRoute = express.Router();


healthRoute.post('/health-status',  createForm);
healthRoute.get('/health-status',  getUserForms);

export default healthRoute;
