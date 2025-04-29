import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./HotelsSearch.css";

const HotelsSearch = () => {
    const [destination, setDestination] = useState("");
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false });
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(1);

    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };

    return (
        <div className="hs-container">
            <div className="search-form">
                <p className="search-title">¿A dónde quieres volar?</p>
                <div className="input-group">
                    <div className="search-field">
                        <input
                            type="text"
                            placeholder="Introduce el destino"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="search-field">
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

                    <div className="search-field">
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

                    <div className="search-field">
                        <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}>
                            {[...Array(5).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1} habitación(es)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-field">
                        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                            {[...Array(6).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1} huésped(es)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-button-group">
                        <span className="promo-code">+ Agregar código promocional</span>
                        <button className="search-button" onClick={() => navigate("/signup")}>
                            Buscar lugares
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default HotelsSearch;
