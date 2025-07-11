import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

import mealsRoutes from './routes/meals.js';
app.use('/api/meals', mealsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));