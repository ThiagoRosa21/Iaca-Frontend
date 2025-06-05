import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; 

function Cadastro() {
  const [tipo, setTipo] = useState("empresa");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cnpj: "",
    telefone: "",
    endereco: "",
    cpf: "",
    local_feira: "",
    whatsapp: false,
    receber_info: false,
  });
  const [erroCadastro, setErroCadastro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroCadastro("");

    const dados =
      tipo === "empresa"
        ? {
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            cnpj: form.cnpj,
            telefone: form.telefone,
            endereco: form.endereco,
            whatsapp: form.whatsapp,
            receber_info: form.receber_info,
          }
        : {
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            cpf: form.cpf,
            local_feira: form.local_feira,
            telefone: form.telefone,
            whatsapp: form.whatsapp,
            receber_info: form.receber_info,
          };

    try {
      await api.post("https://iaca-backend.onrender.com/api/auth/register", {
        tipo,
        dados,
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
          value={form.nome}
          required
          className="cadastro-input"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={form.email}
          required
          className="cadastro-input"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          value={form.senha}
          required
          className="cadastro-input"
        />

        {tipo === "empresa" && (
          <>
            <input
              name="cnpj"
              placeholder="CNPJ"
              onChange={handleChange}
              value={form.cnpj}
              required
              className="cadastro-input"
            />
            <input
              name="telefone"
              placeholder="Telefone"
              onChange={handleChange}
              value={form.telefone}
              className="cadastro-input"
            />
            <input
              name="endereco"
              placeholder="Endereço"
              onChange={handleChange}
              value={form.endereco}
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
              value={form.cpf}
              required
              className="cadastro-input"
            />
            <input
              name="local_feira"
              placeholder="Local da Feira"
              onChange={handleChange}
              value={form.local_feira}
              className="cadastro-input"
            />
            <input
              name="telefone"
              placeholder="Telefone"
              onChange={handleChange}
              value={form.telefone}
              className="cadastro-input"
            />
          </>
        )}

        <label>
          <input
            type="checkbox"
            name="whatsapp"
            checked={form.whatsapp}
            onChange={handleChange}
          />
          Usa WhatsApp
        </label>
        <label>
          <input
            type="checkbox"
            name="receber_info"
            checked={form.receber_info}
            onChange={handleChange}
          />
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
