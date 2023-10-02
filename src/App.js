
import React from 'react';
import InsuranceForm from './InsuranceForm';
import Checkout from './Checkout';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<InsuranceForm />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
