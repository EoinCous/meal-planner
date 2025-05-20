import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMealsFromStorage, addMealToStorage } from "../services/storage";
import { sanitiseInput } from "../services/security";
import MealForm from "../components/MealForm";

function NewMeal() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState({
    name: "",
    type: "Breakfast",
    ingredients: [{ name: "", category: "", customCategory: "" }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedMeals = getMealsFromStorage();
    console.log(`Stored meals length: ${storedMeals.length}`)
    const newMeal = {
      id: storedMeals.length + 1,
      name: sanitiseInput(meal.name),
      type: meal.type,
      ingredients: meal.ingredients.map((ingredient) => ({
        name: sanitiseInput(ingredient.name),
        category: ingredient.category === "Other" && ingredient.customCategory
          ? sanitiseInput(ingredient.customCategory)
          : sanitiseInput(ingredient.category)
      }))
    };

    addMealToStorage(newMeal);
    navigate("/meals");
  };

  return (
    <MealForm meal={meal} setMeal={setMeal} onSubmit={handleSubmit} mode="add" />
  );
}

export default NewMeal;