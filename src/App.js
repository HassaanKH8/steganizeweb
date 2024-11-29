import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Encode from './Encode';
import Decode from './Decode';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encode" element={<Encode />} />
        <Route path="/decode" element={<Decode />} />
      </Routes>
    </Router>
  );
};

export default App;
