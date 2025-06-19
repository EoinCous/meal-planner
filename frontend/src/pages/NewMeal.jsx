import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMeal } from "../services/storage";
import { sanitiseInput } from "../services/security";
import MealForm from "../components/MealForm";

function NewMeal() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState({
    name: "",
    type: "Breakfast",
    ingredients: [{ name: "", category: "", customCategory: "" }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMeal = {
      name: sanitiseInput(meal.name),
      type: meal.type,
      ingredients: meal.ingredients.map((ingredient) => ({
        name: sanitiseInput(ingredient.name),
        category:
          ingredient.category === "Other" && ingredient.customCategory
            ? sanitiseInput(ingredient.customCategory)
            : sanitiseInput(ingredient.category)
      }))
    };

    await addMeal(newMeal);
    navigate("/meals");
  };

  return (
    <MealForm meal={meal} setMeal={setMeal} onSubmit={handleSubmit} mode="add" />
  );
}

export default NewMeal;