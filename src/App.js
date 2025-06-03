import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./PrivateRoute";
import BookForm from "./components/BookForm";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route path="/livro" element={<PrivateRoute><BookForm /></PrivateRoute>} />
      <Route path="/livro/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />
      <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
      
    </Router>
  );
}

export default App;
