const MEALS_KEY = "meals";

export const getMealsFromStorage = () => {
  const data = localStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveMealsToStorage = (meals) => {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
};

export const addMealToStorage = (meal) => {
  const meals = getMeals();
  saveMeals([...meals, meal]);
};

export const updateMealInStorage = (id, updatedMeal) => {
  const meals = getMealsFromStorage().map(meal => meal.id === id ? updatedMeal : meal);
  saveMealsToStorage(meals);
};

export const deleteMealFromStorage = (id) => {
  const meals = getMealsFromStorage().filter(meal => meal.id !== id);
  saveMealsToStorage(meals);
};