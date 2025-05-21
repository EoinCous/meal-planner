import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsFromStorage, updateMealInStorage } from "../services/storage";
import MealForm from "../components/MealForm";

function EditMeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const meals = getMealsFromStorage();
    const foundMeal = meals.find(meal => meal.id === parseInt(id));
    if (!foundMeal) {
      navigate("/meals");
    } else {
      setMeal(foundMeal);
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMeal = {
      ...meal,
      ingredients: meal.ingredients.map(ingredient => ({
        name: ingredient.name,
        category: ingredient.category === "Other" && ingredient.customCategory
          ? ingredient.customCategory
          : ingredient.category
      }))
    };
    updateMealInStorage(updatedMeal.id, updatedMeal);
    navigate("/meals");
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <MealForm meal={meal} setMeal={setMeal} onSubmit={handleSubmit} mode="edit" />
  );
}

export default EditMeal;