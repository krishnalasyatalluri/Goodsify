import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./pages/Register/index";
import LoginPage from "./pages/LoginPage/index"
const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Router>
  )
}
export default App