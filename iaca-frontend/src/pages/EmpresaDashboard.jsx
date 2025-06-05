import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function EmpresaDashboard() {
  const [pontos, setPontos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado.");
      navigate("/login");
      return;
    }

    let decoded;
    try {
      decoded = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      alert("Sessão inválida. Faça login novamente.");
      navigate("/login");
      return;
    }

    const fetchPontos = async () => {
      try {
        const response = await api.get("/empresa/pontos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPontos(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
          navigate("/login");
        } else {
          setErro("Erro ao carregar os pontos.");
          console.error("Erro ao buscar pontos:", err);
        }
      }
    };

    fetchPontos();
  }, [token, navigate]);

  return (
    <div className="empresa-dashboard-container">
      <div className="empresa-dashboard-card">
        <h1 className="empresa-dashboard-title">Dashboard da Empresa</h1>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button className="empresa-button" onClick={() => navigate("/mapa")}>
            Ver Mapa de Pontos
          </button>
          <button className="mapa-voltar-button" onClick={() => navigate("/login")}>
            ⬅ Voltar ao Início
          </button>
        </div>

        <h2 className="empresa-section-title">Pontos de Coleta Ativos</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {pontos.length === 0 ? (
          <p>Nenhum ponto cadastrado ainda.</p>
        ) : (
          pontos.map((ponto) => (
            <div key={ponto.id} className="empresa-ponto-box">
              <h3 className="ponto-nome">{ponto.nome}</h3>
              <p className="ponto-endereco">{ponto.endereco}</p>
              <button
                className="empresa-button-small"
                onClick={() => navigate(`/historico`)}
              >
                Ver histórico de pagamentos
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmpresaDashboard;
