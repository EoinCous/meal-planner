import "../css/MealForm.css";

const predefinedCategories = [
  "Fruit", "Vegetable", "Dairy", "Meat", "Sauce", "Spices",
  "Frozen", "Beverages", "Bread", "Pantry", "Other"
];

function MealForm({ meal, setMeal, onSubmit, mode = "add" }) {
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...meal.ingredients];
    updatedIngredients[index][field] = value;
    setMeal({ ...meal, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setMeal({
      ...meal,
      ingredients: [...meal.ingredients, { name: "", category: "", customCategory: "" }]
    });
  };

  const removeIngredient = (index) => {
    const updated = meal.ingredients.filter((_, i) => i !== index);
    setMeal({ ...meal, ingredients: updated });
  };

  return (
    <div className="meal-form">
      <h2>{mode === "edit" ? "Edit Meal" : "Add a New Meal"}</h2>
      <form onSubmit={onSubmit}>
        <label>
          Meal Name:
          <input
            value={meal.name}
            type="text"
            onChange={(e) => setMeal({ ...meal, name: e.target.value })}
            maxLength={40}
            placeholder="Beans on toast"
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
              maxLength={50}
              required
            />
            <select
              value={ingredient.category}
              onChange={(e) => handleIngredientChange(index, "category", e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              {predefinedCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {ingredient.category === "Other" && (
              <input
                placeholder="Custom Category"
                type="text"
                value={ingredient.customCategory || ""}
                onChange={(e) =>
                  handleIngredientChange(index, "customCategory", e.target.value)
                }
                maxLength={50}
              />
            )}
            {meal.ingredients.length > 1 && (
              <button className="remove-btn" type="button" onClick={() => removeIngredient(index)}>X</button>
            )}
          </div>
        ))}
        <div className="bottom-btns">
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
          <button type="submit">{mode === "edit" ? "Save Changes" : "Add Meal"}</button>
        </div>
      </form>
    </div>
  );
}

export default MealForm;