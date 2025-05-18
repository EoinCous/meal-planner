import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewMeal.css";
import { getMealsFromStorage } from "../services/mealStorage";

function NewMeal() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("Breakfast");
  const [ingredients, setIngredients] = useState([{ name: "", category: "" }]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", category: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedMeals = getMealsFromStorage();
    const meal = {
      id: storedMeals.length + 1,
      name,
      type,
      ingredients
    };

    addMealToStorage(meal);
    navigate("/meals");
  };

  return (
    <div className="new-meal">
      <h2>Add a New Meal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Meal Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </label>

        <h4>Ingredients</h4>
        {ingredients.map((ingredient, index) => (
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
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>

        <br />
        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
}

export default NewMeal;