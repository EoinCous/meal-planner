import { useParams } from 'react-router-dom';
import "../css/MealDetails.css";
import { deleteMealFromStorage, getMealsFromStorage } from '../services/mealStorage';
import { useNavigate } from 'react-router-dom';

function MealDetails(){
  const meals = getMealsFromStorage();
  const { id } = useParams();
  const meal = meals.find(meal => meal.id === parseInt(id));

  if (!meal) {
    return <div>Meal not found.</div>;
  }

  const navigate = useNavigate();

  return (
    <div className="meal-detail">
      <div className="meal-detail-info">
        <h2>{meal.name}</h2>
        <p><strong>Type:</strong> {meal.type}</p>
        <p><strong>Ingredients:</strong> {meal.ingredients.map(ingredient => ingredient.name).join(", ")}</p>
        <p><strong>Recipe:</strong> ?</p>
        <button onClick={() => {
            deleteMealFromStorage(meal.id)
            navigate("/meals")
            localStorage.setItem("mealPlan", JSON.stringify({}));
          }}>
            Delete Meal
        </button>
      </div>
      <img 
        src={meal.image} 
        alt={meal.name} 
        className="meal-detail-image" 
      />
    </div>
  );
}

export default MealDetails;