import { useParams } from 'react-router-dom';
import "../css/MealDetails.css";
import { deleteMealFromStorage, getMealsFromStorage, saveMealPlanToStorage } from '../services/storage';
import { useNavigate } from 'react-router-dom';

function MealDetails(){
  const meals = getMealsFromStorage();
  const { id } = useParams();
  const meal = meals.find(meal => meal.id === parseInt(id));

  if (!meal) {
    return <div>Meal not found.</div>;
  }
  const navigate = useNavigate();

  const deleteMeal = () => {
    deleteMealFromStorage(meal.id)
    navigate("/meals")
    saveMealPlanToStorage({})
  }

  return (
    <div className="meal-detail">
      <img 
        src={meal.image} 
        alt={meal.name} 
        className="meal-detail-image" 
      />
      <div className="meal-detail-info">
        <h2>{meal.name}</h2>
        <p><strong>Type:</strong> {meal.type}</p>
        <p><strong>Ingredients:</strong> {meal.ingredients.map(ingredient => ingredient.name).join(", ")}</p>
        <p><strong>Recipe:</strong> ?</p>
        <div className='buttons'>
          <button onClick={() => navigate(`/meal/${meal.id}/edit`)}>Edit</button>
          <button onClick={() => deleteMeal()}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;