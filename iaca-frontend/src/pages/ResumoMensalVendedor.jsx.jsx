import { useEffect, useState } from "react";
import api from "../api"; // ✅ usa a base segura
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336"];

function ResumoMensalVendedor() {
  const [valorTotal, setValorTotal] = useState(0);
  const [qtdDescarte, setQtdDescarte] = useState(0);
  const [graficoDados, setGraficoDados] = useState([]);
  const token = localStorage.getItem("token");

  const vendedorId = (() => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  })();

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const response = await api.get(`/descarte/vendedor/${vendedorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const totalValor = response.data.reduce(
          (acc, d) => acc + (d.valor_estimado || 0),
          0
        );

        const agrupadoPorData = {};
        response.data.forEach((d) => {
          let data = "Desconhecido";
          if (d.data && !isNaN(new Date(d.data))) {
            data = new Date(d.data).toLocaleDateString("pt-BR", {
              month: "short",
              day: "numeric"
            });
          }
          agrupadoPorData[data] = (agrupadoPorData[data] || 0) + (d.valor_estimado || 0);
        });

        const dadosParaGrafico = Object.entries(agrupadoPorData).map(([data, valor]) => ({
          name: data,
          valor: parseFloat(valor.toFixed(2))
        }));

        setValorTotal(totalValor);
        setQtdDescarte(response.data.length);
        setGraficoDados(dadosParaGrafico);
      } catch (err) {
        console.error("Erro ao buscar resumo do vendedor:", err);
      }
    };

    fetchResumo();
  }, []);

  return (
    <div className="p-6 font-sans bg-yellow-400 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-purple-900 mb-4">Resumo Mensal</h1>
          <p className="text-lg mb-2">💰 <strong>Total estimado recebido:</strong> R$ {valorTotal.toFixed(2)}</p>
          <p className="text-lg">📦 <strong>Quantidade de descartes realizados:</strong> {qtdDescarte}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Valor por Dia</h2>
          {graficoDados.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum dado disponível para exibir o gráfico de barras.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graficoDados} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Distribuição dos Ganhos</h2>
          {graficoDados.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum dado disponível para exibir o gráfico de pizza.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={graficoDados}
                  dataKey="valor"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {graficoDados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumoMensalVendedor;
