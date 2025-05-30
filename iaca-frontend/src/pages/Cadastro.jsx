import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cadastro() {
  const [tipo, setTipo] = useState("empresa");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        tipo,
        dados: form,
      });

      alert(`Cadastro realizado com sucesso como ${tipo}!`);
      navigate("/login");
    } catch (err) {
      alert("Erro ao cadastrar. Verifique os dados.");
      console.error(err);
    }
  };

  return (
    <div className="cadastro-form">
      <h1 className="cadastro-title">Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipo"
              value="empresa"
              checked={tipo === "empresa"}
              onChange={() => setTipo("empresa")}
            />
            Empresa
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="vendedor"
              checked={tipo === "vendedor"}
              onChange={() => setTipo("vendedor")}
            />
            Vendedor
          </label>
        </div>

        <input
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          required
          className="cadastro-input"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
          className="cadastro-input"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
          className="cadastro-input"
        />

        {tipo === "empresa" && (
          <>
            <input
              name="cnpj"
              placeholder="CNPJ"
              onChange={handleChange}
              required
              className="cadastro-input"
            />
            <input
              name="endereco"
              placeholder="Endereço"
              onChange={handleChange}
              className="cadastro-input"
            />
          </>
        )}

        {tipo === "vendedor" && (
          <input
            name="local_feira"
            placeholder="Local da Feira"
            onChange={handleChange}
            required
            className="cadastro-input"
          />
        )}

        <button type="submit" className="cadastro-button">
          Cadastrar
        </button>

        <p className="cadastro-link" onClick={() => navigate("/login")}>
          Já tem conta? Faça login
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
