import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Start } from './pages/Start';
import { Main } from './pages/Main';

function App() {
  const userVisitedMain = localStorage.getItem('userVisitedMain');

  useEffect(() => {
    if (!userVisitedMain) {
      localStorage.setItem('userVisitedMain', 'true');
    }
  }, [userVisitedMain]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={userVisitedMain ? <Navigate to="/main" /> : <Start />}
          ></Route>
          <Route 
            path="/main" 
            element={<Start />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
