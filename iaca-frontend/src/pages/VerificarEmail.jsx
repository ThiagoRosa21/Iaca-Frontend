import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerificarEmail() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email_para_verificar");
    if (!savedEmail) {
      setMensagem("❌ Nenhum e-mail encontrado. Faça o cadastro novamente.");
    } else {
      setEmail(savedEmail);
    }
  }, []);

  const verificarCodigo = async () => {
    try {
      const response = await axios.post("http://192.168.15.124:8000/api/auth/verificar-email", {
        email,
        codigo,
      });
      setMensagem("✅ " + response.data.message);
      setTimeout(() => {
        localStorage.removeItem("email_para_verificar");
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMensagem("❌ " + (err.response?.data.detail || "Erro ao verificar código"));
    }
  };

  const reenviarCodigo = async () => {
    try {
      await axios.post("http://192.168.15.124:8000/api/auth/reenviar-codigo", { email });
      setMensagem("📧 Novo código enviado para seu e-mail!");
    } catch (err) {
      setMensagem("❌ " + (err.response?.data.detail || "Erro ao reenviar código"));
    }
  };

  return (
    <div
      className="verificacao-container"
      style={{
        backgroundColor: "#FFF5E1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "#800080", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Verificação de E-mail
      </h1>

      {email && (
        <p style={{ color: "#444", marginBottom: "1rem" }}>
          Verificando: <strong>{email}</strong>
        </p>
      )}

      <input
        type="text"
        placeholder="Código de verificação"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "250px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      />

      <button
        onClick={verificarCodigo}
        style={{
          backgroundColor: "#a400c4",
          color: "#fff",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "0.5rem",
        }}
      >
        ✅ Verificar e-mail
      </button>

      <button
        onClick={reenviarCodigo}
        style={{
          backgroundColor: "#5c005c",
          color: "#fff",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        🔁 Reenviar código
      </button>

      {mensagem && (
        <p style={{ marginTop: "0.5rem", color: mensagem.startsWith("✅") ? "green" : "red" }}>
          {mensagem}
        </p>
      )}

      <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "#800080",
          textDecoration: "underline",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Voltar ao login
      </button>
    </div>
  );
}
