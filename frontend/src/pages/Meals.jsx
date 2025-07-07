import MealCard from '../components/MealCard';
import MealFilter from '../components/MealFilter';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Meals.css";
import { getMeals } from '../services/storage';

function Meals() {
    const [meals, setMeals] = useState([]);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            const fetchedMeals = await getMeals();
            setMeals(fetchedMeals);
        };

        fetchMeals();
    }, []);

    const filteredMeals = filter === "All" ? meals : meals.filter(meal => meal.type === filter);

    return (
        <div className='meals'>
            <div className='header'>
                <h2>Get inspiration for your meal plan</h2>
            </div>
            <div className='filter'>
                <MealFilter selectedType={filter} onSelect={setFilter} />
            </div>
            <div className='meals-grid'>
                {filteredMeals.map(meal =>
                    <MealCard meal={meal} key={meal._id} />
                )}
            </div>
            <div className='action-btns'>
                <button onClick={() => navigate("/meals/new")}>Add new meal</button>
                <button className="plan-meals-btn" onClick={() => navigate("/planner")}>Plan Meals</button>
            </div>
        </div>
    );
}

export default Meals;