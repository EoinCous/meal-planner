import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MealForm.css";
import { getMealsFromStorage } from "../services/storage";
import { sanitiseInput } from "../services/security";

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
      name: sanitiseInput(name),
      type,
      ingredients: ingredients.map((name, category) => {
        sanitiseInput(name)
        sanitiseInput(category)
      })
    };

    addMealToStorage(meal);
    navigate("/meals");
  };

  return (
    <div className="meal-form">
      <h2>Add a New Meal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal Name:
          <input 
            value={name} 
            type="text"
            onChange={(e) => setName(e.target.value)} 
            maxLength={100} 
            placeholder="Beans on toast"
            required 
          />
        </label>

        <div className="meal-type">
          <label>
            Meal Type:
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
            </select>
          </label>
        </div>

        <h4>Ingredients</h4>
        {ingredients.map((ingredient, index) => (
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
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            )}
          </div>
        ))}
        <div className="bottom-btns">
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
          <button type="submit">Add Meal</button>
        </div>
        
      </form>
    </div>
  );
}

export default NewMeal;