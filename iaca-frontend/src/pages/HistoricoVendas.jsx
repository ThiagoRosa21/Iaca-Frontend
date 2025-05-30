import { useEffect, useState } from "react";
import axios from "axios";

function HistoricoVendas() {
  const [descartes, setDescartes] = useState([]);
  const token = localStorage.getItem("token");

  const vendedorId = (() => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  })();

  useEffect(() => {
    const fetchDescartes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/descarte/vendedor/${vendedorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDescartes(response.data);
      } catch (err) {
        console.error("Erro ao buscar histórico de vendas:", err);
      }
    };

    fetchDescartes();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Histórico de Descartes</h1>

      {descartes.length === 0 && <p>Nenhum descarte registrado ainda.</p>}

      {descartes.map((d) => (
        <div key={d.id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Data:</strong> {new Date(d.data_hora).toLocaleString()}</p>
          <p><strong>Quantidade:</strong> {d.quantidade_kg} kg</p>
          <p><strong>Ponto:</strong> {d.ponto.nome}</p>
          {d.foto_url && (
            <img
              src={d.foto_url}
              alt={`Descarte ${d.id}`}
              className="w-32 h-32 object-cover mt-2"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default HistoricoVendas;
