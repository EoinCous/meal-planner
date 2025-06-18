import { useParams, useNavigate } from 'react-router-dom';
import "../css/MealDetails.css";
import { deleteMeal, getMeals, saveMealPlanToStorage } from '../services/storage';
import { useState, useEffect } from 'react';

function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const meals = await getMeals();
      const foundMeal = meals.find(meal => meal.id === parseInt(id));
      setMeal(foundMeal);
    };

    fetchMeal();
  }, [id]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  const removeMeal = async () => {
    await deleteMeal(meal.id);
    saveMealPlanToStorage({});
    navigate("/meals");
  };

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
          <button onClick={removeMeal}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;