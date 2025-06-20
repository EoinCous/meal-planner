import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }
});

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  ingredients: { type: [ingredientSchema], required: true },
  type: { type: String, required: true }
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;