import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/Perfil.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase";

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dbUser, setDbUser] = useState(null);
  const [imagePreview, setImagePreview] = useState("/perfil.jpg"); // imagem inicial
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserFromDb = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        

        if (docSnap.exists()) {
          setDbUser(docSnap.data());
        } else {
          console.log("Usuário não encontrado no Firestore");
        }
      }
    };
    setImagePreview(dbUser?.fotoUrl)
    fetchUserFromDb();
  }, [user]);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // 🔄 Pré-visualização local
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        // 📤 Upload para Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "toptop");

        const response = await fetch("https://api.cloudinary.com/v1_1/dsadhjxa4/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const imageUrl = data.secure_url;

        if (user?.uid) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, {
            fotoUrl: imageUrl, // ou "fotoPerfil" se quiser
          });
        }

        setImagePreview(imageUrl);

        // 📝 (Opcional) Atualiza Firestore
        if (user?.uid) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, { fotoPerfil: imageUrl });
        }
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
      }
    }
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="perfil-container">
      <div className="img" onClick={handleImageClick} style={{ cursor: "pointer" }}>
        <img src={imagePreview} alt="Perfil" width={199} style={{ borderRadius: "8px" }} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      <h2>Perfil do Usuário</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Nome:</strong> {dbUser?.nome || "Carregando..."}</p>
      <p><strong>Livro Favorito:</strong> {dbUser?.livroFav || "Carregando..."}</p>
      <p><strong>UID:</strong> {user?.uid}</p>
      <button onClick={goHome}>Voltar para Home</button>
    </div>
  );
}
