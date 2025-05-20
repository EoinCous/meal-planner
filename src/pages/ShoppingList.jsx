import { useState, useEffect } from "react";
import { getMealsFromStorage, getMealPlanFromStorage } from "../services/storage";
import "../css/ShoppingList.css";
import EmailForm from "../components/EmailForm";

function ShoppingList() {
  const [groupedMeals, setGroupedMeals] = useState([]);
  const [ingredientsByCategory, setIngredientsByCategory] = useState({});

  useEffect(() => {
    const meals = getMealsFromStorage();
    const mealNames = extractMealNamesFromPlan();
    const selectedMeals = mealNames.map(name => meals.find(meal => meal.name === name));

    setGroupedMeals(groupMealsWithCount(selectedMeals));
    setIngredientsByCategory(groupIngredientsByCategory(selectedMeals));
  }, []);

  const extractMealNamesFromPlan = () => {
    const mealPlan = getMealPlanFromStorage();
    return Object.values(mealPlan)
      .flatMap(day => Object.values(day))
      .filter(Boolean)
      .flat();
  };

  const groupMealsWithCount = (mealsList) => {
    return Object.values(
      mealsList.reduce((acc, meal) => {
        const { name } = meal;
        acc[name] = acc[name]
          ? { ...acc[name], count: acc[name].count + 1 }
          : { ...meal, count: 1 };
        return acc;
      }, {})
    );
  };

  const groupIngredientsByCategory = (mealsList) => {
    const map = {};

    mealsList.forEach(({ ingredients }) => {
      ingredients.forEach(({ category, name }) => {
        if (!map[category]) map[category] = {};

        if (!map[category][name]) {
          map[category][name] = { name, count: 1, selected: true };
        } else {
          map[category][name].count += 1;
        }
      });
    });

    const result = {};
    for (const category in map) {
      result[category] = Object.values(map[category]);
    }

    return result;
  };

  const toggleIngredient = (category, index) => {
  setIngredientsByCategory(prev => {
    const updated = [...prev[category]];
    updated[index] = {
      ...updated[index],
      selected: !updated[index].selected
    };
    return { ...prev, [category]: updated };
  });
};

  return (
    <div className="shopping-list">
      <h2>Your Shopping List</h2>

      <div className="lists">
        <section>
          <h3>Selected Meals:</h3>
          <ul>
            {groupedMeals.map(({ name, count }) => (
              <li key={name}>
                {name} {count > 1 && `(x${count})`}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Ingredients Needed:</h3>
          {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
            <div key={category}>
              <h4 className="category-box">{category}</h4>
              <ul>
                {ingredients.map(({ name, selected, count }, index) => (
                  <li key={`${name}-${index}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleIngredient(category, index)}
                      />
                      {name} {count > 1 && `(x${count})`}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <EmailForm ingredientsByCategory={ingredientsByCategory}/>
    </div>
  );
}

export default ShoppingList;