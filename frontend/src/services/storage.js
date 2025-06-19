const MEALS_KEY = "meals";
const MEAL_PLAN_KEY = "mealPlan";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getMeals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meals`);
    if (!response.ok) throw new Error('Server error');
    const data = await response.json();
    saveMealsToStorage(data); // Optional: Sync with localStorage
    return data;
  } catch (error) {
    console.error('Error fetching meals, falling back to localStorage', error);
    return getMealsFromStorage();
  }
};

export const saveMealsToStorage = (meals) => {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
};

export const getMealsFromStorage = () => {
  const data = localStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (meal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal)
    });
    if (!response.ok) throw new Error('Server error');
    return await response.json();
  } catch (error) {
    console.error('Error adding meal, saving to localStorage instead', error);
    addMealToStorage(meal);
    return meal; // Return the meal so the UI can update
  }
};

export const addMealToStorage = (meal) => {
  const meals = getMealsFromStorage();
  saveMealsToStorage([...meals, meal]);
};

export const updateMeal = async (id, updatedMeal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedMeal)
  });
  if (!response.ok) throw new Error('Failed to update meal');
  return await response.json();
  } catch (error) {
    console.error("Error updating meal, updating in localStorage instead", error);
    updateMealInStorage(id, updatedMeal);
    return updatedMeal;
  }
};

export const updateMealInStorage = (id, updatedMeal) => {
  const meals = getMealsFromStorage().map(meal => meal.id === id ? updatedMeal : meal);
  saveMealsToStorage(meals);
};

export const deleteMeal = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meals/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete meal');
  } catch (error) {
    console.error("Error deleting meal, deleting in localStorage instead", error);
    deleteMealFromStorage(id);
  }
};

export const deleteMealFromStorage = (id) => {
  const meals = getMealsFromStorage().filter(meal => meal.id !== id);
  saveMealsToStorage(meals);
};

export const getMealPlanFromStorage = () => {
  const data = localStorage.getItem(MEAL_PLAN_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveMealPlanToStorage = (mealPlan) => {
  localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(mealPlan));
};