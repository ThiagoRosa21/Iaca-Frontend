import React from "react";
import logo from "../assets/logo.png";
import folha from "../assets/FOLHA IAÇÁ PNG.png";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const cards = [
    { titulo: "Sobre", rota: "/sobrenos" },
    { titulo: "Pontos", rota: "/sobre-pontos" },
    { titulo: "Selo Verde", rota: "/selo-verde" },
  ];

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#fcd116",
        color: "#000",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes fadeUpZoom {
          from { opacity: 0; transform: scale(0.95) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .content-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(0.5rem, 1vw, 1rem);
        }

        main {
          padding-top: 90px;
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            text-align: center;
          }
        }
    
@media (max-width: 420px) {
  header {
    top: 0 !important;
    position: relative !important;
    padding: 0.5rem 0 !important;
  }

  .hero {
    flex-direction: column !important;
    margin-top: 0 !important;
    padding: 1rem 0.5rem !important;
    gap: 1.5rem !important;
  }

  .video-container {
    width: 100% !important;
    max-width: 100% !important;
    background-color: black;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  iframe {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16 / 9;
    display: block;
    border: none;
  }

  main {
    padding-top: 0 !important;
  }

  h2 {
    font-size: 1.4rem !important;
    text-align: center;
  }

  p {
    font-size: 1rem !important;
    text-align: justify;
    padding: 0 0.4rem;
  }

  button {
    width: 100% !important;
    font-size: 1rem !important;
    padding: 0.8rem !important;
    margin-top: 1rem !important;
  }

  .cards {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
}

      `}</style>

  
      <header
        style={{
          backgroundColor: "#fcd116",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.6rem 0",
          position: "fixed",
          top: -50,
          left: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="content-wrapper">
          <h1
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.6rem)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img src={logo} alt="Logotipo do Projeto Iaçá" style={{ height: "clamp(39px, 9vw, 90px)" }} />
          </h1>
        </div>
      </header>

     
      <main>
      
        <section style={{ backgroundColor: "#4e0a24", color: "#fff", padding: "2rem 0" }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
                    <br></br>
          <br></br>
          <div className="content-wrapper" style={{ animation: "fadeIn 1s ease-in-out" }}>
            <div
              className="hero"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
                animation: "fadeUpZoom 1.2s ease-out forwards",
              }}
            >
              
              <div
                className="video-container"
                style={{
                  flex: "1 1 500px",
                  maxWidth: "600px",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
             
                <iframe
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  src="https://www.youtube.com/embed/yAlaAw5G1ag?autoplay=1&mute=1&loop=1&playlist=yAlaAw5G1ag&controls=0&showinfo=0&rel=0"
                  title="Vídeo Promocional do Projeto Iaçá"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

             
              <div style={{ flex: "1 1 300px", maxWidth: "500px", textAlign: "left" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>O que é o Iaçá?</h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                  O Iaçá é uma solução sustentável criada por estudantes do CESUPA para combater o descarte inadequado
                  dos caroços de açaí em Belém do Pará. A plataforma conecta feirantes e empresas, incentivando o reaproveitamento do caroço como matéria-prima
                  e promovendo impacto social e ambiental positivo.
                </p>
                <button
                  onClick={() => navigate("/cadastro")}
                  style={{
                    marginTop: "1.5rem",
                    backgroundColor: "#1d7225",
                    color: "#fff",
                    padding: "0.7rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                    animation: "pulse 2s infinite",
                  }}
                >
                  FAZER CADASTRO
                </button>
              </div>
            </div>
          </div>
        </section>

      
        <section style={{ backgroundColor: "#fff", padding: "2rem 0", textAlign: "center" }}>
          <div className="content-wrapper">
            <h3 style={{ fontSize: "clamp(0.9rem, 1.8vw, 1rem)", marginBottom: "1rem", color: "#000" }}>
              Saiba mais sobre o Iaçá
            </h3>
            <div
              className="cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.6rem",
                width: "100%",
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#fcd116",
                    padding: "0.6rem",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <h4 style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)", marginBottom: "0.5rem" }}>{card.titulo}</h4>
                  <button
                    onClick={() => navigate(card.rota)}
                    style={{
                      backgroundColor: "#1d7225",
                      color: "#fff",
                      border: "none",
                      padding: "clamp(0.1rem, 0.5vw, 0.3rem) clamp(0.3rem, 0.8vw, 0.6rem)",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "clamp(0.5rem, 1vw, 0.7rem)",
                    }}
                  >
                    Saiba mais →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: "#2e7d32", color: "#fff", padding: "1rem 0", textAlign: "center", width: "100%" }}>
          <div className="content-wrapper">
            <h4 style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)", marginBottom: "0.6rem" }}>Contato</h4>
            <p style={{ fontSize: "clamp(0.5rem, 1vw, 0.7rem)" }}>Email: projetoiaca@gmail.com</p>
            <p style={{ fontSize: "clamp(0.5rem, 1vw, 0.7rem)" }}>WhatsApp: (91) 98559-1934</p>
            <p style={{ fontSize: "clamp(0.5rem, 1vw, 0.7rem)" }}>Instagram: @projeto.iaca</p>
            <p style={{ marginTop: "0.8rem", fontSize: "clamp(0.4rem, 0.8vw, 0.6rem)", color: "#c8e6c9" }}>
              © 2025 Iaçá. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
