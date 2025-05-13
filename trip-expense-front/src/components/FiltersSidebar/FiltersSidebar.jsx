import React, { useState } from 'react';
import './FiltersSidebar.css';

const FiltersSidebar = () => {
  const [airline, setAirline] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [minDepartureTime, setMinDepartureTime] = useState('');
  const [maxDepartureTime, setMaxDepartureTime] = useState('');
  const [maxDuration, setMaxDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      airline,
      maxPrice,
      directOnly,
      departureCity,
      arrivalCity,
      minDepartureTime,
      maxDepartureTime,
      maxDuration,
    };
    console.log(filters);
    // Aquí puedes pasar los filtros al componente padre vía props o contexto.
  };

  return (
    <aside className="filters-sidebar">
      <h3 className="filters-sidebar-title">Filtros de vuelo</h3>
      <form onSubmit={handleSubmit} className="filters-sidebar-form">

        <div className="filters-sidebar-form-group">
          <label htmlFor="airline">Aerolínea</label>
          <input
            type="text"
            id="airline"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            placeholder="Ej: Avianca"
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="departureCity">Ciudad de origen</label>
          <input
            type="text"
            id="departureCity"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            placeholder="Ej: Medellín"
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="arrivalCity">Ciudad de destino</label>
          <input
            type="text"
            id="arrivalCity"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            placeholder="Ej: Bogotá"
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="minDepartureTime">Hora salida mínima</label>
          <input
            type="time"
            id="minDepartureTime"
            value={minDepartureTime}
            onChange={(e) => setMinDepartureTime(e.target.value)}
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="maxDepartureTime">Hora salida máxima</label>
          <input
            type="time"
            id="maxDepartureTime"
            value={maxDepartureTime}
            onChange={(e) => setMaxDepartureTime(e.target.value)}
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="maxPrice">Precio máximo (USD)</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Ej: 500"
          />
        </div>

        <div className="filters-sidebar-form-group">
          <label htmlFor="maxDuration">Duración máxima (min)</label>
          <input
            type="number"
            id="maxDuration"
            value={maxDuration}
            onChange={(e) => setMaxDuration(e.target.value)}
            placeholder="Ej: 120"
          />
        </div>

        <div className="filters-sidebar-form-group-checkbox">
          <input
            type="checkbox"
            id="directOnly"
            checked={directOnly}
            onChange={() => setDirectOnly(!directOnly)}
          />
          <label htmlFor="directOnly">
            Solo vuelos directos
          </label>
        </div>

        <button type="submit" className="filters-sidebar-button">
          Aplicar filtros
        </button>
      </form>
    </aside>
  );
};

export default FiltersSidebar;
