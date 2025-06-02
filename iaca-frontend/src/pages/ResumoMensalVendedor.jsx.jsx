import { useEffect, useState } from "react";
import axios from "axios";

function ResumoMensalVendedor() {
  const [valorTotal, setValorTotal] = useState(0);
  const [qtdDescarte, setQtdDescarte] = useState(0);
  const token = localStorage.getItem("token");

  const vendedorId = (() => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  })();

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const response = await axios.get(
          `http://192.168.15.124:8000/api/descarte/vendedor/${vendedorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const totalValor = response.data.reduce(
          (acc, d) => acc + (d.valor_estimado || 0),
          0
        );

        setValorTotal(totalValor);
        setQtdDescarte(response.data.length);
      } catch (err) {
        console.error("Erro ao buscar resumo do vendedor:", err);
      }
    };

    fetchResumo();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Resumo Mensal</h1>
        <p><strong>Total estimado recebido:</strong> R$ {valorTotal.toFixed(2)}</p>
        <p><strong>Quantidade de descartes realizados:</strong> {qtdDescarte}</p>
      </div>
    </div>
  );
}

export default ResumoMensalVendedor;
