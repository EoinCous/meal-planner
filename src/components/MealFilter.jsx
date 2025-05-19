import "../css/MealFilter.css";

const mealTypes = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

function MealFilter({ selectedType, onSelect }){
    return (
        <div className="meal-filter">
            {mealTypes.map(type => (
                <button
                    key={type}
                    className={selectedType === type ? "active" : ""}
                    onClick={() => onSelect(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    )
}

export default MealFilter;