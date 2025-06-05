import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cliente API com base na variável de ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function HistoricoDescartes() {
  const [descartes, setDescartes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null;
  }

  let vendedorId;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    vendedorId = payload.id;
  } catch (e) {
    alert("Sessão inválida. Faça login novamente.");
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const fetchDescartes = async () => {
      try {
        const response = await api.get(`https://iaca-backend.onrender.com/api/descarte/vendedor/${vendedorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDescartes(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
          navigate("/login");
        } else {
          setErro("Erro ao buscar descartes.");
          console.error("Erro ao buscar descartes:", err);
        }
      }
    };

    fetchDescartes();
  }, [vendedorId, token, navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Histórico de Descartes</h1>

        <button className="mapa-voltar-button" onClick={() => navigate("/dashboard")}>
          ⬅ Voltar ao Início
        </button>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

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
