// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Example routes
import mealsRoutes from './routes/meals.js';
app.use('/api/meals', mealsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));