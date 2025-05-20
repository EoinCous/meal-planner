import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsFromStorage, updateMealInStorage } from "../services/storage";

function EditMeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const meals = getMealsFromStorage();
    const foundMeal = meals.find(m => m.id === parseInt(id));
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
      ingredients: meal.ingredients.map(ing => ({
        name: ing.name,
        category: ing.category === "Other" && ing.customCategory
          ? ing.customCategory
          : ing.category
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