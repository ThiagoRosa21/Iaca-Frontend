import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Ícone customizado para descarte
const descarteIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function ZoomMapa({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 16);
    }
  }, [lat, lng, map]);
  return null;
}

function Dashboards_Vendedor() {
  const [totalRecebido, setTotalRecebido] = useState(0);
  const [pontos, setPontos] = useState([]);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  const token = localStorage.getItem("token");
  const vendedorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchDescartes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/descarte/vendedor/${vendedorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const descartes = response.data || [];
        const total = descartes.reduce(
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
    const ponto = pontos.find((p) => p.id === parseInt(id));
    setPontoSelecionado(ponto);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard do Vendedor</h1>
        <p className="dashboard-info">Total recebido no mês:</p>
        <p className="dashboard-total">R$ {totalRecebido.toFixed(2)}</p>

        <h2 className="dashboard-subtitle">Selecionar Ponto de Coleta</h2>
        <select onChange={(e) => handleSelectPonto(e.target.value)}>
          <option value="">Selecione o ponto</option>
          {pontos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
        <MapContainer
          center={[-1.455, -48.49]} // Posição inicial (ex: Belém/PA)
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          {pontos.map((ponto) => (
            <Marker
              key={ponto.id}
              position={[ponto.lat, ponto.lng]}
              icon={descarteIcon}
            >
              <Popup>{ponto.nome}</Popup>
            </Marker>
          ))}
          {pontoSelecionado && (
            <ZoomMapa lat={pontoSelecionado.lat} lng={pontoSelecionado.lng} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboards_Vendedor;
