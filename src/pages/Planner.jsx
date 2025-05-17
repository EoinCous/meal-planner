import "../css/Planner.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMealsFromStorage } from "../services/mealStorage";

function Planner() {
  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  // Load from localStorage or use empty object
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem("mealPlan");
    return saved ? JSON.parse(saved) : {};
  });

  const getMealOptions = (type) => {
    const meals = getMealsFromStorage();
    return meals.filter((meal) => meal.type.toLowerCase() === type.toLowerCase());
  };

  const handleChange = (day, mealType, selectedOptions) => {
    const values = Array.from(selectedOptions, (option) => option.value);
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType.toLowerCase()]: values
      }
    }));
  };

  // Save to localStorage whenever mealPlan changes
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const clearMealPlan = () => {
    localStorage.setItem("mealPlan", JSON.stringify({}));
    setMealPlan({});
  }

  return (
    <div className="planner">
      <h2>Choose your meals</h2>
      <table>
        <thead>
          <tr>
            <th className="corner-cell"></th>
            {daysOfWeek.map((day) => (
              <th key={day} className="header-cell">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealTypes.map((mealType) => (
            <tr key={mealType}>
              <td className="meal-type">{mealType}</td>
              {daysOfWeek.map((day) => {
                const options = getMealOptions(mealType);
                const selectedMeals = mealPlan[day]?.[mealType.toLowerCase()] || [];

                return (
                  <td key={`${day}-${mealType}`} className="meal-cell">
                    <select
                      multiple
                      value={selectedMeals}
                      onChange={(e) => handleChange(day, mealType, e.target.selectedOptions)}
                      size={options.length > 4 ? 4 : options.length}
                    >
                      {options.map((meal) => (
                        <option key={meal.name} value={meal.name}>
                          {meal.name}
                        </option>
                      ))}
                    </select>
                    <div className="selected-meals">
                      {selectedMeals.join(", ")}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="action-btns">
        <button onClick={clearMealPlan}>Clear</button>
        <button onClick={() => navigate("/shopping-list")}>Generate Shopping List</button>
      </div>
    </div>
  );
}

export default Planner;