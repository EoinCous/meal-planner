import "../css/Home.css";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="hero">
                <div className="hero-text">
                    <h1>What do you want to eat?</h1>
                    <p>
                        Get inspiration from previous meal ideas, create a meal plan and generate a shopping list.
                    </p>
                    <button onClick={() => navigate("/meals")}>Get Started</button>
                </div>
                <div className="hero-image">
                    <img 
                        src="/images/spaghetti-bolognese.jpeg"
                        alt="Spaghetti Bolognese"
                    />
                </div>
            </div>
            <section className="features">
                <FeatureCard
                    title="Meals"
                    description="Browse your saved meals and their ingredients."
                    buttonText="View Meals"
                    imageSrc="/images/meals.jpg"
                    imageAlt="Meals"
                    imagePosition="left"
                    onClick={() => navigate("/meals")}
                />
                <FeatureCard
                    title="Meal Planner"
                    description="Create your weekly plan by picking meals for each day."
                    buttonText="Plan Meals"
                    imageSrc="/images/meal-planner.jpg"
                    imageAlt="Meal Planner"
                    imagePosition="right"
                    onClick={() => navigate("/planner")}
                />
                <FeatureCard
                    title="Shopping List"
                    description="Automatically generate a grocery list based on your plan."
                    buttonText="View List"
                    imageSrc="/images/shopping-list.png"
                    imageAlt="Shopping List"
                    imagePosition="left"
                    onClick={() => navigate("/shopping-list")}
                />
            </section>
        </div>
    );
}

export default Home;