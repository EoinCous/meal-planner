import { useState, useEffect } from "react";
import meals from '../data/meals.json';
import emailjs from '@emailjs/browser';

function ShoppingList() {
  const [groupedMeals, setGroupededMeals] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const rawPlan = localStorage.getItem('mealPlan');
    const parsedPlan = rawPlan ? JSON.parse(rawPlan) : {};

    // Collect all unique meal names from the mealPlan
    const mealNames = Object.values(parsedPlan)
      .flatMap(day => Object.values(day))
      .filter(Boolean)
      .flat();

    // Map meal names to full meal objects
    const mealsSelected = mealNames.map(name => meals.find(meal => meal.name === name));
    console.log(mealsSelected);

    const mealsCount = mealsSelected.reduce((acc, meal) => {
      const name = meal.name;
      acc[name] = acc[name] ? { ...acc[name], count: acc[name].count + 1 } : { ...meal, count: 1 };
      return acc;
    }, {});
    
    console.log(Object.values(mealsCount));
    setGroupededMeals(Object.values(mealsCount));

    console.log(mealsSelected.map((meal) => meal.ingredients).flat());
    setAllIngredients(mealsSelected.map((meal) => meal.ingredients).flat());
  }, []);
  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_email: userEmail,
          ingredients: allIngredients.map((ingredient) => ingredient.name).join(", ")
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ).then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          alert('Message sent!');
        },
        (error) => {
          console.error('Email send error:', error.text);
          alert('Something went wrong.');
        }
      );

    setUserEmail("");
  } 

  return (
    <div className="shopping-list">
      <h2>Your Shopping List</h2>

      <section>
        <h3>Selected Meals:</h3>
        <ul>
          
          {groupedMeals.map((meal) => (
            <li key={meal.name}>
              {meal.name} {meal.count > 1 && `(x${meal.count})`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Ingredients Needed:</h3>
        <ul>
          {allIngredients.map((ingredient, index) => (
            <li key={`${ingredient.name}-${index}`}>{ingredient.name}</li>
          ))}
        </ul>
      </section>

      <h3>Send list by email</h3>
      <input 
        type="email" 
        placeholder="johnsmith@example.com" 
        value={userEmail} 
        onChange={(e) => setUserEmail(e.target.value)}
        required
    ></input>
    <button onClick={sendEmail}>Email</button>
    </div>
  );
}

export default ShoppingList;