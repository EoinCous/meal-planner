import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/MealForm.css";

const predefinedCategories = [
  "Fruit", "Vegetable", "Dairy", "Meat", "Sauce", "Spices",
  "Frozen", "Beverages", "Bread", "Pantry", "Other"
];

function MealForm({ meal, setMeal, onSubmit, mode = "add" }) {
  const [mealImageFile, setMealImageFile] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = meal.image || "";

    // Upload image if a file was selected
    if (mealImageFile) {
      const formData = new FormData();
      formData.append("file", mealImageFile);
      formData.append("upload_preset", "unsigned_meal_uploads");

      try {
        const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Image upload error:", data);
          alert("Image upload failed. Please try again.");
          return;
        }
        console.log(data.secure_url)
        imageUrl = data.secure_url;
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Image upload error. Try again.");
        return;
      }
    }

    // Send full meal data (including image URL) to parent
    const finalMeal = { ...meal, image: imageUrl };
    onSubmit(finalMeal);
  };

  return (
    <div className="meal-form">
      <h2>{mode === "edit" ? "Edit Meal" : "Add a New Meal"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal Name: 
          <input
            value={meal.name}
            type="text"
            onChange={(e) => setMeal({ ...meal, name: e.target.value })}
            maxLength={40}
            placeholder="Chicken curry"
            required
          />
        </label>

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

        <label>
          Meal Image: 
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMealImageFile(e.target.files[0])}
          />
        </label>

        {(mealImageFile || (mode === "edit" && meal.image)) && (
          <div className="image-preview">
            <img
              src={
                mealImageFile
                  ? URL.createObjectURL(mealImageFile)  // New image preview
                  : meal.image                         // Existing image
              }
              alt="Meal Preview"
            />
          </div>
        )}

        <label>
          Ingredients:
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
          <button type="button" onClick={addIngredient}>Add Ingredient</button>

        </label>
        
        <div className="bottom-btns">
          <button type="button" onClick={() => navigate("/meals")}>Cancel</button>
          <button type="submit">{mode === "edit" ? "Save Changes" : "Add Meal"}</button>
        </div>
      </form>
    </div>
  );
}

export default MealForm;