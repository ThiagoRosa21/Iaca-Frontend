import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import logo from "../assets/logo.png";

function Login({ setUser }) {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("vendedor") !== null ? "vendedor" : "empresa";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = tipo === "vendedor" ? "Login - Vendedor" : "Login - Empresa";
  }, [tipo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("username", email);
      form.append("password", senha);

      const response = await api.post("https://iaca-backend.onrender.com/auth/login", form); 
      const token = response.data.access_token;

      if (!token) throw new Error("Token ausente");

      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      const role = decoded.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setUser({ token, role });

      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Login falhou. Verifique e-mail e senha.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo Iacá" className="logo" />

      <h2 className="login-title">
        Login - {tipo === "vendedor" ? "Vendedor de Açaí" : "Empresa Reutilizadora"}
      </h2>

      <p className="login-subtitle">Insira seu e-mail e senha para continuar</p>

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

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>

      <p className="login-link" onClick={() => navigate("/cadastro")}>
        Não tem conta? Cadastre-se
      </p>
    </div>
  );
}

export default Login;
