import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function HistoricoVendas() {
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
        const response = await api.get(`/descarte/vendedor/${vendedorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDescartes(response.data);
      } catch (err) {
        setErro("Erro ao buscar histórico de vendas.");
        console.error("Erro ao buscar histórico de vendas:", err);
      }
    };

    fetchDescartes();
  }, [vendedorId, token]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Histórico de Descartes</h1>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {descartes.length === 0 && !erro && (
        <p>Nenhum descarte registrado ainda.</p>
      )}

      {descartes.map((d) => (
        <div key={d.id} className="border p-4 mb-4 rounded shadow">
          <p><strong>📅 Data:</strong> {new Date(d.data_hora).toLocaleString()}</p>
          <p><strong>⚖️ Quantidade:</strong> {d.quantidade_kg} kg</p>
          <p><strong>📍 Ponto:</strong> {d.ponto.nome}</p>
          {d.foto_url && (
            <img
              src={d.foto_url}
              alt={`Descarte ${d.id}`}
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default HistoricoVendas;
