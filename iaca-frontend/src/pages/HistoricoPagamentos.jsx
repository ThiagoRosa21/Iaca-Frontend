import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function HistoricoPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const empresaId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await api.get(`/pagamento/empresa/${empresaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagamentos(response.data);
      } catch (err) {
        console.error("Erro ao buscar pagamentos:", err);
      }
    };

    fetchPagamentos();
  }, [empresaId, token]);

  const pagar = async (id, valor) => {
    try {
      const response = await api.post(
        `/pagamento/pagar`,
        { empresa_id: empresaId, valor_centavos: Math.round(valor * 100) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = response.data.checkout_url;
    } catch (err) {
      alert("Erro ao redirecionar para o pagamento.");
    }
  };

  return (
    <div className="pagamentos-container">
      <button onClick={() => navigate(-1)} className="mapa-voltar-button">
        ⬅️ Voltar
      </button>

      <h1 className="pagamentos-title">Histórico de Pagamentos</h1>

      {pagamentos.length === 0 ? (
        <p className="text-center mt-4">Nenhum pagamento encontrado.</p>
      ) : (
        pagamentos.map((p) => (
          <div key={p.id} className="pagamento-card">
            <p><strong>🆔 ID:</strong> {p.id}</p>
            <p><strong>💰 Valor:</strong> R$ {(p.valor_centavos / 100).toFixed(2)}</p>
            <p>
              <strong>{p.status === "pago" ? "✅ Status:" : "⏳ Status:"}</strong> {p.status}
            </p>
            <p><strong>📅 Data:</strong> {new Date(p.data_pagamento).toLocaleString()}</p>

            <div className="pagamento-botoes">
              {p.status === "pago" && (
                <>
                  <button
                    onClick={() =>
                      window.open(`${import.meta.env.VITE_API_URL}/pagamento/comprovante/${p.id}`, "_blank")
                    }
                  >
                    📄 Comprovante
                  </button>
                  <button
                    onClick={() =>
                      window.open(`${import.meta.env.VITE_API_URL}/pagamento/nota-fiscal/${p.id}`, "_blank")
                    }
                  >
                    🧾 Nota Fiscal
                  </button>
                </>
              )}
              {p.status === "pendente" && (
                <button
                  onClick={() => pagar(p.id, p.valor_centavos / 100)}
                  className="botao-pagar"
                >
                  💳 Pagar agora
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoricoPagamentos;
