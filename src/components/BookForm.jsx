import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import "./../styles/BookForm.css";
export default function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // se existir, é edição
  const [formData, setFormData] = useState({
    nm_book: "",
    autor: "",
    category: "",
    desc_book: "",
    pages_book: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/book/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8000/api/book/${id}`
      : "http://localhost:8000/api/book";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    navigate("/home");
  };

  return (
    <div className="book-form-container">
  <h2>{id ? "Editar Livro" : "Adicionar Livro"}</h2>
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Nome do Livro"
      value={formData.nm_book}
      onChange={(e) => setFormData({ ...formData, nm_book: e.target.value })}
    />
    <input
      placeholder="Autor"
      value={formData.autor}
      onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
    />
    <input
      placeholder="Categoria"
      value={formData.category}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    />
    <textarea
      placeholder="Descrição"
      value={formData.desc_book}
      onChange={(e) => setFormData({ ...formData, desc_book: e.target.value })}
    />
    <input
      type="number"
      placeholder="Páginas"
      value={formData.pages_book}
      onChange={(e) => setFormData({ ...formData, pages_book: e.target.value })}
    />
    <button type="submit">{id ? "Atualizar" : "Adicionar"}</button>
  </form>
</div>

  );
}
