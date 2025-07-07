import { Link } from "react-router-dom"
import '../css/MealCard.css'

function MealCard({meal}){
    
    return (
        <div className="meal-card">
            <Link to={`/meal/${meal._id}`} className="meal-link">
                <img
                    src={meal.image}
                    alt={meal.name}
                    className="meal-image"
                />
                <div className="meal-info">
                    <h3 className="meal-name">{meal.name}</h3>
                </div>
            </Link>
        </div>
    )
}

export default MealCard;