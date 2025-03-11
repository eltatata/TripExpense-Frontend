import React from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import LandingPage from './components/LandingPage'

function App() {
  return (
    
      <div className="App">
        <LandingPage/>
        <SignUpPage/>
        <LoginPage/>
      </div>
  );
}

export default App
