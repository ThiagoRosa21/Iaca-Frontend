import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { getDistance } from "geolib";
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

function MapaDescarte() {
  const [pontos, setPontos] = useState([]);
  const [maisProximo, setMaisProximo] = useState(null);
  const [coordenadas, setCoordenadas] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await axios.get("http://192.168.15.124:8000/api/empresa/pontos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pontosComResumo = await Promise.all(
          response.data.map(async (p) => {
            try {
              const resumo = await axios.get(`http://192.168.15.124:8000/api/descarte/ponto/${p.id}/resumo`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return { ...p, kg: resumo.data.total_kg };
            } catch {
              return { ...p, kg: 0 };
            }
          })
        );

        setPontos(pontosComResumo);
      } catch (err) {
        console.error("Erro ao buscar pontos de coleta:", err);
      }
    };

    const pegarLocalizacao = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setCoordenadas({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
      }
    };

    pegarLocalizacao();
    fetchPontos();
  }, []);

  useEffect(() => {
    if (coordenadas && pontos.length > 0 && !maisProximo) {
      const pontoMaisProximo = pontos.reduce((maisPerto, atual) => {
        const distMaisPerto = getDistance(coordenadas, {
          latitude: maisPerto.lat,
          longitude: maisPerto.lng,
        });
        const distAtual = getDistance(coordenadas, {
          latitude: atual.lat,
          longitude: atual.lng,
        });
        return distAtual < distMaisPerto ? atual : maisPerto;
      });

      setMaisProximo(pontoMaisProximo);
    }
  }, [coordenadas, pontos]);

  return (
    <div className="mapa-container">
      <h1 className="mapa-title">Locais de Descarte</h1>
    <button
        className="mapa-voltar-button"
        onClick={() => {
          const role = localStorage.getItem("role");
          if (role === "empresa") {
            navigate("/empresa");
          } else {
            navigate("/vendedor");
          }
        }}
      >
        ⬅ Voltar ao Dashboard
      </button>
      <select
        className="mapa-select"
        onChange={(e) => {
          const selected = pontos.find(p => p.id === parseInt(e.target.value));
          if (selected) setMaisProximo(selected);
        }}
      >
        <option value="">Selecione um ponto de descarte</option>
        {pontos.map(p => (
          <option key={p.id} value={p.id}>{p.nome}</option>
        ))}
      </select>

      {maisProximo && (
        <div className="mapa-info-box">
          <p><strong>Ponto selecionado:</strong> {maisProximo.nome}</p>
          <p><strong>Endereço:</strong> {maisProximo.endereco}</p>
          <p><strong>Quantidade atual:</strong> {maisProximo.kg?.toFixed(2)} kg</p>

          {maisProximo.kg > 0 ? (
           <button
  onClick={() =>
    navigate(`/compra/${maisProximo.id}`, {
      state: { ponto_id: maisProximo.id }
    })
  }
  className="mapa-button"
>
  Ver detalhes e pagar
</button>

          ) : (
            <p className="mapa-alerta" style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
              ⚠️ Este ponto ainda não possui caroço de açaí disponível para compra.
            </p>
          )}
        </div>
      )}

      <div className="mapa-box">
        <MapContainer
          center={coordenadas || [-1.455, -48.49]}
          zoom={13}
          style={{ height: "600px", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {maisProximo && <FlyToPonto ponto={maisProximo} />}
          {pontos.map((ponto) => (
            <Marker key={ponto.id} position={[ponto.lat, ponto.lng]} icon={defaultIcon}>
              <Popup>
                <strong>{ponto.nome}</strong><br />
                {ponto.endereco}<br />
                <button
                  onClick={() => navigate(`/compra/${ponto.id}`)}
                  className="mapa-popup-button"
                >
                  Ver detalhes
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapaDescarte;
