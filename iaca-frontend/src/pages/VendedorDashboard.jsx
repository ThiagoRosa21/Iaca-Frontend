import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToPonto({ ponto }) {
  const map = useMap();
  useEffect(() => {
    if (ponto) {
      map.flyTo([ponto.lat, ponto.lng], 16, { duration: 1.2 });
    }
  }, [ponto, map]);
  return null;
}

function Dashboards_Vendedor() {
  const [pontos, setPontos] = useState([]);
  const [pontoSelecionado, setPontoSelecionado] = useState("");
  const [pontoSelecionadoObj, setPontoSelecionadoObj] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  const [totalRecebido, setTotalRecebido] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const vendedorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchDescartes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/descarte/vendedor/${vendedorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const total = response.data.reduce(
          (acc, d) => acc + (d.valor_estimado || 0),
          0
        );
        setTotalRecebido(total);
      } catch (err) {
        console.error("Erro ao buscar descartes:", err);
      }
    };

    const fetchPontos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/empresa/pontos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPontos(response.data);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      }
    };

    fetchDescartes();
    fetchPontos();
  }, []);

  const handleSelectPonto = (id) => {
    setPontoSelecionado(id);
    const ponto = pontos.find((p) => p.id === parseInt(id));
    setPontoSelecionadoObj(ponto);
  };

  const solicitarDescarte = async () => {
    if (!pontoSelecionado || !quantidade) return alert("Preencha todos os campos");
    try {
      await axios.post(
        `http://localhost:8000/api/descarte/`,
        {
          vendedor_id: vendedorId,
          ponto_id: parseInt(pontoSelecionado),
          quantidade_kg: parseFloat(quantidade),
          foto_url: "https://via.placeholder.com/100"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Descarte registrado com sucesso!");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao registrar descarte:", err);
      alert("Erro ao registrar descarte.");
    }
  };

  return (
    <>
      {/* Mapa fora do card */}
      <div style={{ backgroundColor: "#ffb800", padding: "20px" }}>
        <MapContainer
          center={[-1.455, -48.49]}
          zoom={13}
          style={{ height: "400px", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {pontoSelecionadoObj && <FlyToPonto ponto={pontoSelecionadoObj} />}
          {pontos.map((ponto) => (
            <Marker key={ponto.id} position={[ponto.lat, ponto.lng]} icon={defaultIcon}>
              <Popup>
                <strong>{ponto.nome}</strong><br />
                {ponto.endereco}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Card separado abaixo */}
      <div style={{ backgroundColor: "#ffb800", minHeight: "100vh", paddingBottom: "60px" }}>
        <div style={{
          backgroundColor: "#fff5dd",
          padding: "30px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "500px",
          margin: "30px auto"
        }}>
          <h1 style={{ color: "#660066" }}>Dashboard do Vendedor</h1>

          <button onClick={() => navigate("/login")} style={{ marginBottom: "12px", background: "#4a0033", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", fontWeight: "bold", cursor: "pointer" }}>
            ⬅ Voltar ao Início
          </button>

          <div style={{ marginBottom: "16px" }}>
            <button onClick={() => navigate("/historico-vendedor")}style={{ marginRight: "8px", background: "#4a0033", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 14px", cursor: "pointer" }}>
              📋 Ver Histórico
            </button>
            <button style={{ background: "#4a0033", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 14px", cursor: "pointer" }}>
              📊 Ver Resumo
            </button>
          </div>

          <h2 style={{ color: "#800080" }}>Solicitar Descarte</h2>

          <select
            value={pontoSelecionado}
            onChange={(e) => handleSelectPonto(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}
          >
            <option value="">Selecione o ponto de descarte</option>
            {pontos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <input
            type="number"
            value={quantidade}
            placeholder="Quantidade em kg"
            onChange={(e) => setQuantidade(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}
          />

          <button
            onClick={solicitarDescarte}
            style={{ backgroundColor: "#8000c8", color: "#fff", padding: "10px 16px", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            Enviar descarte
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboards_Vendedor;
