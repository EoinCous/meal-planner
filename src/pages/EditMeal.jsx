import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsFromStorage, updateMealInStorage } from "../services/storage";
import "../css/MealForm.css"

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
    <div className="meal-form">
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal Name:
          <input
            value={meal.name}
            type="text"
            onChange={(e) => setMeal({ ...meal, name: e.target.value })}
            maxLength={100}
            required
          />
        </label>

        <div className="meal-type">
          <label>
            Meal Type:
            <select
              value={meal.type}
              onChange={(e) => setMeal({ ...meal, type: e.target.value })}
              required
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
            </select>
          </label>
        </div>
        
        <h4>Ingredients</h4>
        {meal.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              placeholder="Name"
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              maxLength={100}
              required
            />
            <input
              placeholder="Category"
              type="text"
              value={ingredient.category}
              onChange={(e) => handleIngredientChange(index, "category", e.target.value)}
              maxLength={100}
              required
            />
            {meal.ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            )}
          </div>
        ))}
        <div className="bottom-btns">
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditMeal;