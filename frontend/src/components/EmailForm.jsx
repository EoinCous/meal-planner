import { useState } from "react";
import emailjs from '@emailjs/browser';
import "../css/EmailForm.css";

function EmailForm({ ingredientsByCategory }){
    const [userEmail, setUserEmail] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        // Format the ingredients grouped by category
        const formattedIngredients = Object.entries(ingredientsByCategory)
            .map(([category, ingredients]) => {
                const selected = ingredients.filter(i => i.selected).map(i => i.name);
                if (selected.length === 0) return null;
                return `${category}:\n${selected.map(i => `- ${i}`).join("\n")}`;
            })
            .filter(Boolean) // Remove nulls
            .join("\n\n"); // Add spacing between categories

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                user_email: userEmail,
                ingredients: formattedIngredients,
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
        <div className="email-form">
            <h3>Send list by email</h3>
            <form onSubmit={sendEmail}>
                <input
                type="email"
                placeholder="johnsmith@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                maxLength={100}
                required
                />
                <button type="submit">Email</button>
            </form>
        </div>
    )
}

export default EmailForm;