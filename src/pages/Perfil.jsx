import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Perfil.css";

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="perfil-container">
      <h2>Perfil do Usuário</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Nome:</strong> {user?.name}</p>
      <p><strong>Livro Favorito:</strong> {user?.livroFav}</p>
      <p><strong>UID:</strong> {user?.uid}</p>
      <button onClick={goHome}>Voltar para Home</button>
    </div>
  );
}
