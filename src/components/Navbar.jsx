// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        // Mock logout logic
        setUser(null);
        navigate('/'); // Redirect to home
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">האתגר של איש הביטקוין</div>
                <div className="burger" onClick={toggleMenu}>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>
            </div>
            <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>
                <Link to="/" className="menu-item" onClick={toggleMenu}>
                    Home
                </Link>
                {user ? (
                    <button
                        className="menu-item"
                        onClick={() => {
                            handleLogout();
                            toggleMenu();
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/auth" className="menu-item" onClick={toggleMenu}>
                        Login/Signup
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
