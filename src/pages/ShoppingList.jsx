import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

function ShoppingList() {
  const meals = JSON.parse(localStorage.getItem("meals"));
  const [groupedMeals, setGroupedMeals] = useState([]);
  const [ingredientsByCategory, setIngredientsByCategory] = useState({});
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const mealNames = extractMealNamesFromPlan();
    const selectedMeals = mealNames.map(name => meals.find(meal => meal.name === name));

    setGroupedMeals(groupMealsWithCount(selectedMeals));
    setIngredientsByCategory(groupIngredientsByCategory(selectedMeals));
  }, []);

  const extractMealNamesFromPlan = () => {
    const rawPlan = localStorage.getItem('mealPlan');
    const parsedPlan = rawPlan ? JSON.parse(rawPlan) : {};
    return Object.values(parsedPlan)
      .flatMap(day => Object.values(day))
      .filter(Boolean)
      .flat();
  };

  const groupMealsWithCount = (mealsList) => {
    return Object.values(
      mealsList.reduce((acc, meal) => {
        const { name } = meal;
        acc[name] = acc[name]
          ? { ...acc[name], count: acc[name].count + 1 }
          : { ...meal, count: 1 };
        return acc;
      }, {})
    );
  };

  const groupIngredientsByCategory = (mealsList) => {
    const map = {};
    mealsList.forEach(({ ingredients }) => {
      ingredients.forEach(({ category, name }) => {
        if (!map[category]) map[category] = [];
        map[category].push({ name, selected: true });
      });
    });
    return map;
  };

  const toggleIngredient = (category, index) => {
  setIngredientsByCategory(prev => {
    const updated = [...prev[category]];
    updated[index] = {
      ...updated[index],
      selected: !updated[index].selected
    };
    return { ...prev, [category]: updated };
  });
};

  const sendEmail = (e) => {
    e.preventDefault();
    const selected = Object.entries(ingredientsByCategory)
      .flatMap(([_, ingredients]) =>
        ingredients.filter(i => i.selected).map(i => i.name)
      );

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_email: userEmail,
        ingredients: selected.join(", ")
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      (result) => {
        console.log('Email sent successfully:', result.text);
        alert('Email sent!');
      },
      (error) => {
        console.error('Email send error:', error.text);
        alert('Something went wrong.');
      }
    );

    setUserEmail("");
  };

  return (
    <div className="shopping-list">
      <h2>Your Shopping List</h2>

      <section>
        <h3>Selected Meals:</h3>
        <ul>
          {groupedMeals.map(({ name, count }) => (
            <li key={name}>
              {name} {count > 1 && `(x${count})`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Ingredients Needed:</h3>
        {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
          <div key={category}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            <ul>
              {ingredients.map(({ name, selected }, index) => (
                <li key={`${name}-${index}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleIngredient(category, index)}
                    />
                    {name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <h3>Send list by email</h3>
      <form onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="johnsmith@example.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <button type="submit">Email</button>
      </form>
    </div>
  );
}

export default ShoppingList;