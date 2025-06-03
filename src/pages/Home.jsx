import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/book");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este livro?")) {
      await fetch(`http://localhost:8000/api/book/${id}`, {
        method: "DELETE"
      });
      fetchBooks(); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goPerfil = () => {
    navigate("/perfil");
  };

  const goToCreateBook = () => {
    navigate("/livro");
  };

  const handleEdit = (id) => {
    navigate(`/livro/${id}`);
  };

  return (
    <div className="home-container">
  <h2>Bem-vindo, {user?.email}</h2>

  <div className="header">
    <button onClick={handleLogout}>Sair</button>
    <button onClick={goPerfil}>Meu Perfil</button>
    <button onClick={goToCreateBook}>Adicionar Livro</button>
  </div>

  <div className="books-list">
    <h3>Livros Cadastrados</h3>
    {books.length === 0 ? (
      <p>Nenhum livro encontrado.</p>
    ) : (
      books.map((book) => (
        <div key={book.id} className="book-card">
          <h4>{book.nm_book}</h4>
          <p><strong>Autor:</strong> {book.autor}</p>
          <p><strong>Categoria:</strong> {book.category}</p>
          <p><strong>Descrição:</strong> {book.desc_book}</p>
          <p><strong>Páginas:</strong> {book.pages_book}</p>
          <button onClick={() => handleEdit(book.id)}>✏️ Editar</button>
          <button onClick={() => handleDelete(book.id)}>🗑️ Excluir</button>
        </div>
      ))
    )}
  </div>
</div>
  );
}
