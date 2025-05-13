import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import LoginPage from './pages/loginPage/LoginPage.jsx'
import SignUpPage from './pages/signUpPage/SignUpPage.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import FlightsPage from './pages/flightsPage/FlightsPage.jsx';
import HotelsPage from './pages/hotelsPage/HotelsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HotelsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
