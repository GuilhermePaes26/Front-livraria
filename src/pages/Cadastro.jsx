import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./../styles/Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    idade: "",
    livroFav: ""
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setLoading(true);
    setErro("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nome: formData.nome,
        email: formData.email,
        idade: formData.idade,
        livroFav: formData.livroFav
      });
      
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso. Tente fazer login.");
      } else if (err.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres.");
      } else {
        console.error(err);
        setErro("Erro ao cadastrar. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={formData.idade}
          onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Livro Favorito"
          value={formData.livroFav}
          onChange={(e) => setFormData({ ...formData, livroFav: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}
