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
        <div className="hs-page">
            <div className="hs-container">
                <p className="hs-title">¿A dónde quieres volar?</p>
                <div className="hs-form">
                    <input className="hs-input"
                        type="text"
                        placeholder="Introduce el destino"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />

                    <div className="hs-picker">
                        <input className="hs-input"
                            type="text"
                            readOnly
                            placeholder="Check-In"
                            value={checkInDate.toLocaleDateString()}
                            onClick={() => setShowCalendar({ ...showCalendar, checkIn: !showCalendar.checkIn })}
                        />
                        {showCalendar.checkIn && (
                            <div className="hs-cdropdown">
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

                    <div className="hs-picker">
                        <input className="hs-input"
                            type="text"
                            readOnly
                            placeholder="Check-Out"
                            value={checkOutDate.toLocaleDateString()}
                            onClick={() => setShowCalendar({ ...showCalendar, checkOut: !showCalendar.checkOut })}
                        />
                        {showCalendar.checkOut && (
                            <div className="hs-cdropdown">
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

                    <select className="hs-dropdown" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                        {[...Array(5).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1} habitación(es)
                            </option>
                        ))}
                    </select>

                    <select className="hs-dropdown" value={guests} onChange={(e) => setGuests(e.target.value)}>
                        {[...Array(6).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1} huésped(es)
                            </option>
                        ))}
                    </select>

                </div>

                <div className="hs-bgroup">
                    <span className="hs-promocode">+ Agregar código promocional</span>
                    <button className="hs-button" onClick={() => navigate("/signup")}>
                        Buscar lugares
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelsSearch;
