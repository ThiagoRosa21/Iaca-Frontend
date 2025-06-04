import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; 

function Cadastro() {
  const [tipo, setTipo] = useState("empresa");
  const [form, setForm] = useState({});
  const [erroCadastro, setErroCadastro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroCadastro("");

    try {
      await api.post("/auth/register", {
        tipo,
        dados: form,
      });

      localStorage.setItem("email_para_verificar", form.email);
      navigate("/verificar-email");

    } catch (err) {
      const detail = err.response?.data?.detail || "Erro ao cadastrar.";

      if (detail.toLowerCase().includes("email")) {
        setErroCadastro(`O e-mail "${form.email}" já está cadastrado.`);
      } else if (detail.toLowerCase().includes("cpf")) {
        setErroCadastro(`O CPF "${form.cpf}" já está cadastrado.`);
      } else if (detail.toLowerCase().includes("cnpj")) {
        setErroCadastro(`O CNPJ "${form.cnpj}" já está cadastrado.`);
      } else {
        setErroCadastro(detail);
      }

      console.error(err);
    }
  };

  return (
    <div className="cadastro-form">
      <h1 className="cadastro-title">Cadastro</h1>
      {erroCadastro && (
        <div style={{ color: "red", marginBottom: "10px" }}>{erroCadastro}</div>
      )}
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
              name="telefone"
              placeholder="Telefone"
              onChange={handleChange}
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
          <>
            <input
              name="cpf"
              placeholder="CPF"
              onChange={handleChange}
              required
              className="cadastro-input"
            />
            <input
              name="local_feira"
              placeholder="Local da Feira"
              onChange={handleChange}
              className="cadastro-input"
            />
            <input
              name="telefone"
              placeholder="Telefone"
              onChange={handleChange}
              className="cadastro-input"
            />
          </>
        )}

        <label>
          <input type="checkbox" name="whatsapp" onChange={handleChange} />
          Usa WhatsApp
        </label>
        <label>
          <input type="checkbox" name="receber_info" onChange={handleChange} />
          Receber informações
        </label>

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
