import "../css/MealFilter.css";

const mealTypes = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

function MealFilter({ selectedType, onSelect }) {
    return (
        <div className="meal-filter">
            {/* Desktop buttons */}
            <div className="filter-buttons">
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

            {/* Mobile dropdown */}
            <div className="filter-dropdown">
                <select value={selectedType} onChange={(e) => onSelect(e.target.value)}>
                    {mealTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default MealFilter;