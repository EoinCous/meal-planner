import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMeals, updateMeal } from "../services/storage";
import MealForm from "../components/MealForm";

function EditMeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const meals = await getMeals();
        const foundMeal = meals.find(meal => meal._id === id);
        if (!foundMeal) {
          navigate("/meals");
        } else {
          setMeal(foundMeal);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
        navigate("/meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id, navigate]);

  const handleSubmit = async (newMealData) => {
    const updatedMeal = {
      ...newMealData,
      ingredients: newMealData.ingredients.map(ingredient => ({
        name: ingredient.name,
        category:
          ingredient.category === "Other" && ingredient.customCategory
            ? ingredient.customCategory
            : ingredient.category
      }))
    };

    try {
      await updateMeal(updatedMeal._id, updatedMeal);
      navigate("/meals");
    } catch (error) {
      console.error("Error updating meal:", error);
      // Optional: Show user a fallback or message
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <MealForm meal={meal} setMeal={setMeal} onSubmit={handleSubmit} mode="edit" />
  );
}

export default EditMeal;