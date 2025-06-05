import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function CompraPonto() {
  const { pontoId } = useParams();
  const [resumo, setResumo] = useState(null);
  const token = localStorage.getItem("token");

  const empresaId = (() => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  })();

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const response = await api.get(`/api/descarte/ponto/${pontoId}/resumo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumo(response.data);
      } catch (err) {
        console.error("Erro ao buscar resumo do ponto:", err);
      }
    };

    fetchResumo();
  }, [pontoId]);

  const handlePagamento = async () => {
    try {
      const response = await api.post(
        "/api/pagamento/pagar",
        {
          empresa_id: empresaId,
          valor_centavos: Math.round(resumo.valor_estimado_total * 100),
          ponto_id: pontoId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = response.data.checkout_url;
    } catch (err) {
      alert("Erro ao iniciar pagamento. Tente novamente.");
      console.error(err);
    }
  };

  if (!resumo)
    return <p className="pagamento-carregando">Carregando dados do ponto...</p>;

  return (
    <div className="pagamento-container">
      <div className="pagamento-card">
        <h1 className="pagamento-title">Resumo do Ponto de Coleta</h1>

        <div className="pagamento-info">
          <p><strong>Nome:</strong> {resumo.nome}</p>
          <p><strong>Quantidade total:</strong> {resumo.total_kg.toFixed(2)} kg</p>
          <p><strong>Valor por kg:</strong> R$ {resumo.valor_kg_atual.toFixed(2)}</p>
          <p><strong>Total estimado:</strong> R$ {resumo.valor_estimado_total.toFixed(2)}</p>
        </div>

        <button className="pagamento-button" onClick={handlePagamento}>
          Ir para pagamento
        </button>
      </div>
    </div>
  );
}

export default CompraPonto;
