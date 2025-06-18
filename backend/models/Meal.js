// backend/models/Meal.js
import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name: String,
    type: String,
    image: String,
    description: String,
});

export default mongoose.model('Meal', mealSchema);