import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Cities from "../../crud/Cities/Cities";
import Hotels from "../../crud/Hotels/Hotels";
import Flights from "../../crud/Flights/Flights";
import Activities from "../../crud/Activities/Activities";
import Packages from "../../crud/Packages/Packages";
import Users from "../../crud/Users/Users";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("Ciudades");

  const renderContent = () => {
    switch (activeSection) {
      case "Ciudades":
        return <Cities />;
      case "Hoteles":
        return <Hotels />;
      case "Vuelos":
        return <Flights />;
      case "Actividades":
        return <Activities />;
      case "Paquetes de viaje":
        return <Packages />;
      case "Usuarios":
        return <Users />;
      default:
        return <div>Selecciona una sección</div>;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="admin-content-area">
        <Navbar />
        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
