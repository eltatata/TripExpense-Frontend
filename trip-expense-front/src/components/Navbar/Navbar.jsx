import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/TripExpenseLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="TripExpense Logo" />
      </div>
      <div className="nav__buttons">
        {isAuthenticated ? (
          <button className="nav__logout__button" onClick={handleLogoutClick}>
            Cerrar Sesión
          </button>
        ) : (
          <>
            <button className="nav__login__button" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className="nav__signup__button" onClick={handleSignupClick}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
