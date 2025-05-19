import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsFromStorage, updateMealInStorage } from "../services/mealStorage";

function EditMeal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const meals = getMealsFromStorage();
    const foundMeal = meals.find(meal => meal.id === parseInt(id));
    if (!foundMeal) {
        navigate("/meals"); // Redirect if meal not found
    } else {
      setMeal(foundMeal);
    }
  }, [id, navigate]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...meal.ingredients];
    updatedIngredients[index][field] = value;
    setMeal({ ...meal, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setMeal({ ...meal, ingredients: [...meal.ingredients, { name: "", category: "" }] });
  };

  const removeIngredient = (index) => {
    const updated = meal.ingredients.filter((_, i) => i !== index);
    setMeal({ ...meal, ingredients: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMealInStorage(meal.id, meal)
    navigate("/meals");
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="edit-meal">
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal Name:
          <input
            value={meal.name}
            onChange={(e) => setMeal({ ...meal, name: e.target.value })}
            required
          />
        </label>

        <label>
          Meal Type:
          <select
            value={meal.type}
            onChange={(e) => setMeal({ ...meal, type: e.target.value })}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </label>

        <h4>Ingredients</h4>
        {meal.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              required
            />
            <input
              placeholder="Category"
              value={ingredient.category}
              onChange={(e) => handleIngredientChange(index, "category", e.target.value)}
              required
            />
            {meal.ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditMeal;