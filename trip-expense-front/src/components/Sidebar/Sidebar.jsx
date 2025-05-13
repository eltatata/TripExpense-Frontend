import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setActiveSection, activeSection }) => {
  const sections = [
    "Ciudades",
    "Hoteles",
    "Vuelos",
    "Actividades",
    "Paquetes de viaje",
    "Usuarios",
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`sidebar-button ${
              activeSection === section ? "active" : ""
            }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
