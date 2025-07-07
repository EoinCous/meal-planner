import "../css/Planner.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeals, getMealPlanFromStorage, saveMealPlanToStorage } from "../services/storage";

function Planner() {
  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const [mealPlan, setMealPlan] = useState(() => getMealPlanFromStorage());
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const fetchedMeals = await getMeals();
      setMeals(fetchedMeals);
    };

    fetchMeals();
  }, []);

  const getMealOptions = (type) => {
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
    saveMealPlanToStorage(mealPlan);
  }, [mealPlan]);

  const clearMealPlan = () => {
    saveMealPlanToStorage({});
    setMealPlan({});
  }

  return (
    <div className="planner">
      <h2>Choose your meals</h2>
      <div className="planner-wrapper">
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
      </div>
      
      <div className="action-btns">
        <button onClick={clearMealPlan}>Clear</button>
        <button onClick={() => navigate("/shopping-list")}>Generate Shopping List</button>
      </div>
    </div>
  );
}

export default Planner;