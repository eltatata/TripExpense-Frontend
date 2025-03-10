import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SearchForm.css";

const SearchForm = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <div className="search-container">
      <div className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Ciudad de Origen"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Ciudad de Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
          />
          <select value={adults} onChange={(e) => setAdults(e.target.value)} className="select-dropdown">
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {num + 1} Adulto(s)
              </option>
            ))}
          </select>

          <div className="date-picker">
            <input
              type="text"
              readOnly
              placeholder="Check-In"
              value={checkInDate.toLocaleDateString()}
              className="search-input"
              onClick={() => setShowCalendar({ ...showCalendar, checkIn: !showCalendar.checkIn })}
            />
            {showCalendar.checkIn && (
              <div className="calendar-dropdown">
                <Calendar
                  onChange={(date) => {
                    setCheckInDate(date);
                    setShowCalendar({ ...showCalendar, checkIn: false });
                  }}
                  value={checkInDate}
                />
              </div>
            )}
          </div>

          <div className="date-picker">
            <input
              type="text"
              readOnly
              placeholder="Check-Out"
              value={checkOutDate.toLocaleDateString()}
              className="search-input"
              onClick={() => setShowCalendar({ ...showCalendar, checkOut: !showCalendar.checkOut })}
            />
            {showCalendar.checkOut && (
              <div className="calendar-dropdown">
                <Calendar
                  onChange={(date) => {
                    setCheckOutDate(date);
                    setShowCalendar({ ...showCalendar, checkOut: false });
                  }}
                  value={checkOutDate}
                />
              </div>
            )}
          </div>

          <select value={children} onChange={(e) => setChildren(e.target.value)} className="select-dropdown">
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num}>
                {num} Niño(s)
              </option>
            ))}
          </select>
        </div>

        <button className="search-button">Buscar <br/>Viajes</button>
      </div>
    </div>
  );
};

export default SearchForm;
