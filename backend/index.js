import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.routes.js';
import dotenv from 'dotenv';


import connectdb from './db/db.js';
import healthRoute from './routes/health.routes.js';
import careTakerRoutes from './routes/careTaker.routes.js';
import painLogRoutes from './routes/painLog.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;


connectdb();


app.use(cors({
  origin: 'https://koladeade.github.io/sicklecellsummative', // replace with your frontend's URL
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/health', healthRoute); // Assuming health status routes are under healthRoute
app.use('/api/caretaker', careTakerRoutes );
app.use("/api/pain", painLogRoutes);

 app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});