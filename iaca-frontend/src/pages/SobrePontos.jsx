import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const pontosExemplo = [
  { id: 1, nome: "Feira da 25", lat: -1.455, lng: -48.49, endereco: "Tv. 25 de Setembro, Belém - PA" },
  { id: 2, nome: "Feira da Pedreira", lat: -1.465, lng: -48.495, endereco: "Av. Pedro Miranda, Belém - PA" },
];

export default function SobrePontos() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", padding: "2rem", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>


      <h1 style={{ color: "#4e0a24" }}>Pontos de Coleta de Caroço de Açaí</h1>
      <p style={{ maxWidth: "800px", lineHeight: 1.6 }}>
        Os pontos de coleta são locais estratégicos espalhados por Belém onde os feirantes podem descartar os caroços de açaí
        de forma adequada. Esses pontos são acessíveis, seguros e essenciais para garantir que os resíduos sejam reaproveitados
        por empresas de forma sustentável, transformando descarte em oportunidade.
      </p>

      <div style={{ marginTop: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <MapContainer center={[-1.455, -48.49]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {pontosExemplo.map((ponto) => (
            <Marker key={ponto.id} position={[ponto.lat, ponto.lng]} icon={icon}>
              <Popup>
                <strong>{ponto.nome}</strong><br />
                {ponto.endereco}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}