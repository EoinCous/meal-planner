import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className='header'>
      <nav className="navbar">
          <div className="logo">
              <Link to="/" onClick={() => setMenuOpen(false)}>Feed Me</Link>
          </div>

        <button className="burger" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/meals" onClick={() => setMenuOpen(false)}>Meals</Link></li>
          <li><Link to="/planner" onClick={() => setMenuOpen(false)}>Planner</Link></li>
          <li><Link to="/shopping-list" onClick={() => setMenuOpen(false)}>Shopping List</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;