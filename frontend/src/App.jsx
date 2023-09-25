import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage, BookDetailsPage } from "./pages/Pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
