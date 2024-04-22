import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MultiplayerModeSelection from './components/MultiplayerModeSelection.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import TriviaGame from './components/TriviaGame.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<MultiplayerModeSelection />} />
        <Route path="/" element={<TriviaGame />} /> {/* Render the trivia game on the home page */}
      </Routes>
    </Router>
  );
}

export default App;
