import MealCard from '../components/MealCard';
import MealFilter from '../components/MealFilter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Meals.css";

function Meals(){
    const meals = JSON.parse(localStorage.getItem("meals"));
    const navigate = useNavigate();
    
    const [filter, setFilter] = useState("All");
    const filteredMeals = filter === "All" ? meals : meals.filter(meal => meal.type === filter);

    return (
        <div className='meals'>
            <div className='header'>
                <h2>Get inspiration for your meal plan</h2>
                <button className="plan-meals-btn" onClick={() => navigate("/planner")}>Plan Meals</button>
            </div>
            <div className='filter'>
                <MealFilter selectedType={filter} onSelect={setFilter} />
            </div>
            <div className='meals-grid'>
                {filteredMeals.map(meal =>
                    <MealCard meal={meal} key={meal.id} />
                )}
            </div>
        </div>
    )
}

export default Meals;