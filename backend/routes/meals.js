import express from 'express';
import Meal from '../models/Meal.js';

const router = express.Router();

// Get all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meals', error });
    }
});

// Add a meal
router.post('/', async (req, res) => {
    try {
        const newMeal = new Meal(req.body);
        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add meal', error });
    }
});

// Update a meal
router.put('/:id', async (req, res) => {
    try {
        const updatedMeal = await Meal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated document
        );

        if (!updatedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        res.json(updatedMeal);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update meal', error });
    }
});

// Delete a meal
router.delete('/:id', async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.id);

        if (!deletedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete meal', error });
    }
});

export default router;