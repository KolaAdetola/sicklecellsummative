import express from 'express';
import { createForm } from '../controllers/healthStatus.controller.js';

const healthRoute = express.Router();


healthRoute.post('/health-status',  createForm);

export default healthRoute;
