import React, { useEffect, useState } from 'react';
import './FlightsCardOpt.css';
import logoAvianca from '../../assets/LogAvianca.jpg';
import logoLatam from '../../assets/LogLatam.jpg';
import logoCopa from '../../assets/LogCopa.png';
import logoViva from '../../assets/LogViva.jpg';

const FlightsCardOpt = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                airline: 'Avianca',
                flightNumber: 'AV123',
                airlineLogoUrl: logoAvianca,
                departureCity: { name: 'Medellín' },
                arrivalCity: { name: 'Bogotá' },
                departureDateTime: '2025-06-01T08:00:00Z',
                arrivalDateTime: '2025-06-01T09:30:00Z',
                durationMinutes: 90,
                price: 129,
              },
              {
                id: 2,
                airline: 'LATAM',
                flightNumber: 'LA456',
                airlineLogoUrl: logoLatam,
                departureCity: { name: 'Medellín' },
                arrivalCity: { name: 'Cali' },
                departureDateTime: '2025-06-01T10:00:00Z',
                arrivalDateTime: '2025-06-01T11:45:00Z',
                durationMinutes: 105,
                price: 142,
              },
              {
                id: 3,
                airline: 'Copa Airlines',
                flightNumber: 'CM789',
                airlineLogoUrl: logoCopa,
                departureCity: { name: 'Medellín' },
                arrivalCity: { name: 'Panamá' },
                departureDateTime: '2025-06-01T13:00:00Z',
                arrivalDateTime: '2025-06-01T14:30:00Z',
                durationMinutes: 90,
                price: 198,
              },
              {
                id: 4,
                airline: 'Viva Air',
                flightNumber: 'VV321',
                airlineLogoUrl: logoViva,
                departureCity: { name: 'Medellín' },
                arrivalCity: { name: 'Cartagena' },
                departureDateTime: '2025-06-01T15:30:00Z',
                arrivalDateTime: '2025-06-01T17:00:00Z',
                durationMinutes: 90,
                price: 114,
              },
            ]);
          }, 1000)
        );

        setFlights(data);
      } catch (err) {
        setError('Error cargando vuelos');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <div className="flights-options-loading">Cargando vuelos...</div>;
  if (error) return <div className="flights-options-error">⚠️ {error}</div>;

  return (
    <>
      {flights.map((flight) => (
        <div className="flights-options-card" key={flight.id}>
          <div className="flights-options-card-left">
            <img
              src={flight.airlineLogoUrl || '/default-logo.png'}
              alt={flight.airline}
              className="flights-options-logo"
            />
            <div>
              <h2 className="flights-options-airline">{flight.airline}</h2>
              <p className="flights-options-number">Vuelo #{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flights-options-card-center">
            <div className="flights-options-section">
              <div className="flights-options-label">Salida</div>
              <p className="flights-options-info">
                {flight.departureCity.name} <br />
                {new Date(flight.departureDateTime).toLocaleString()}
              </p>
            </div>

            <div className="flights-options-section">
              <div className="flights-options-label">Llegada</div>
              <p className="flights-options-info">
                {flight.arrivalCity.name} <br />
                {new Date(flight.arrivalDateTime).toLocaleString()}
              </p>
            </div>

            <div className="flights-options-duration">
              Duración: <span>{flight.durationMinutes} min</span>
            </div>
          </div>

          <div className="flights-options-card-right">
            <div className="flights-options-price">${flight.price} USD</div>
            <button className="flights-options-btn">Ver ofertas</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FlightsCardOpt;
