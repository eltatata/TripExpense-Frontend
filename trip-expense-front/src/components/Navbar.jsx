import React from "react";
import "./Navbar.css";
import logo from "../assets/TripExpenseLogo.png"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="TripExpense Logo" />
      </div>
      <div className="nav__buttons">
        <button className="nav__login__button">Iniciar Sesión</button>
        <button className="nav__signup__button">Registrarse</button>
      </div>
    </nav>
  );
};

export default Navbar;
