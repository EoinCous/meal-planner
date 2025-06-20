import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/">Home</Link>
        <Link to="/meals">Meals</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/shopping-list">Shopping List</Link>
      </nav>
      <p>&copy; {new Date().getFullYear()} BitePlan</p>
    </footer>
  );
}

export default Footer;
