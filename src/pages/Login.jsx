import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, senha);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));

      navigate("/home");
    } catch (err) {
      console.error(err);
      setErro("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem conta?{" "}
        <span onClick={() => navigate("/cadastro")}>Cadastre-se</span>
      </p>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}
