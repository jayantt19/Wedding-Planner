import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsProfileOpen(false); // Close profile dropdown if open
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsOpen(false); // Close mobile menu if open
  };

  // Handle scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate user state (replace with actual auth logic)
  const isLoggedIn = false; // Set to true for testing logged-in state

  // Handle logout (placeholder)
  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
    console.log('Logged out');
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <span className="logo-icon">💍</span> theWedding
        </Link>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </div>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="100">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="200">
              About
            </Link>
          </li>
          <li>
            <Link to="/service" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="300">
              Services
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="400">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/guestlist" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="500">
              Guest List
            </Link>
          </li>
          <li>
            <Link to="/budget" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="600">
              Budget
            </Link>
          </li>
          <li>
            <Link to="/reminders" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="700">
              Reminders
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="800">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/pricing" onClick={toggleMenu} data-aos="fade-down" data-aos-delay="900">
              Pricing
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="profile-menu">
              <div className="profile-icon" onClick={toggleProfile}>
                <i className="fas fa-user-circle"></i>
              </div>
              {isProfileOpen && (
                <ul className="profile-dropdown" data-aos="fade-down">
                  <li>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" onClick={() => setIsProfileOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">
                Log In
              </Link>
              <Link to="/signin" className="nav-btn signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;