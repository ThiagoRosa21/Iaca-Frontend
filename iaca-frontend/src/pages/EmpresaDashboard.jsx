import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmpresaDashboard() {
  const [pontos, setPontos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await axios.get("http://192.168.15.124:8000/api/empresa/pontos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPontos(response.data);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      }
    };
    fetchPontos();
  }, []);

  return (
    <div className="empresa-dashboard-container">
      <div className="empresa-dashboard-card">
        <h1 className="empresa-dashboard-title">Dashboard da Empresa</h1>
        <button
  className="mapa-voltar-button"
    onClick={() => navigate("/login")}
    >
    ⬅ Voltar ao Início
    </button>
        <button
          className="empresa-button"
          onClick={() => navigate("/mapa")}
        >
          Ver Mapa de Pontos
        </button>

        <h2 className="empresa-section-title">Pontos de Coleta Ativos</h2>

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
