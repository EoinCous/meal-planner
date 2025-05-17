const MEALS_KEY = "meals";

export const getMealsFromStorage = () => {
  const data = localStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveMealsToStorage = (meals) => {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
};