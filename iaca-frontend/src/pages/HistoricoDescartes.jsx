import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cliente API com base na variável de ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function HistoricoDescartes() {
  const [descartes, setDescartes] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const vendedorId = (() => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  })();

  useEffect(() => {
    const fetchDescartes = async () => {
      try {
        const response = await api.get(`/descarte/vendedor/${vendedorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDescartes(response.data);
      } catch (err) {
        console.error("Erro ao buscar descartes:", err);
      }
    };

    fetchDescartes();
  }, [vendedorId, token]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Histórico de Descartes</h1>

        <button className="mapa-voltar-button" onClick={() => navigate("/dashboard")}>
          ⬅ Voltar ao Início
        </button>

        {descartes.length === 0 ? (
          <p>Nenhum descarte encontrado.</p>
        ) : (
          descartes.map((d) => (
            <div key={d.id} className="card-roxo">
              <p><strong>📅 Data:</strong> {new Date(d.data_hora).toLocaleString()}</p>
              <p><strong>⚖️ Quantidade:</strong> {d.quantidade_kg} kg</p>
              <p><strong>📌 Ponto:</strong> {d.ponto.nome}</p>
              <p><strong>💸 Valor estimado:</strong> R$ {d.valor_estimado?.toFixed(2) || "-"}</p>
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoricoDescartes;
