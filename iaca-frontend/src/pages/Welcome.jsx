import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const cards = [
    { titulo: "Sobre", rota: "/sobrenos" },
    { titulo: "Pontos", rota: "/sobre-pontos" },
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

        .content-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(0.5rem, 2vw, 1rem);
        }

        h2, h3, h4 {
          margin: 0;
        }

        /* Notebooks e telas grandes (1024px e acima) */
        @media (min-width: 1024px) {
          .hero {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .video-container {
            flex: 1 1 50%;
            max-width: 600px;
          }

          .hero-text {
            flex: 1 1 40%;
            max-width: 500px;
          }

          .cards {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Tablets (500px a 1023px) */
        @media (max-width: 1023px) and (min-width: 500px) {
          .hero {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }

          .video-container {
            flex: 1 1 100%;
            max-width: 100%;
            aspect-ratio: 16 / 9;
          }

          .hero-text {
            flex: 1 1 100%;
            max-width: 100%;
            text-align: center;
          }

          .cards {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        /* Telas menores que 500px */
        @media (max-width: 499px) {
          header {
            padding: 0.3rem 0 !important;
            top: 0 !important; /* Garante que o header comece no topo */
          }

          header img {
            height: clamp(30px, 7vw, 60px) !important;
          }

          section[style*="background-color: #4e0a24"] {
            padding: 0.8rem 0 !important;
            top: 0 !important; /* Remove o top fixo da section */
            padding-top: 60px !important; /* Adiciona padding-top para compensar a altura do header */
          }

          .hero {
            padding: 0.8rem 0.3rem !important;
            gap: 0.8rem !important;
            margin-top: 0 !important;
            margin-bottom: 1rem !important;
          }

          .video-container {
            border-radius: 8px !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          iframe {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 9 !important;
          }

          .hero-text {
            text-align: center !important;
          }

          h2 {
            font-size: 1.2rem !important;
            margin-bottom: 0.6rem !important;
          }

          p {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
            margin-bottom: 0.6rem !important;
          }

          button {
            font-size: 0.9rem !important;
            padding: 0.6rem !important;
            margin: 0.4rem 0 !important;
            border-radius: 6px !important;
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
        <section style={{ backgroundColor: "#4e0a24", color: "#fff", padding: "2rem 0", top: "40px" }}>
       
          <div className="content-wrapper" style={{ animation: "fadeIn 1s ease-in-out" }}>
            <br></br><br></br><br></br><br></br>
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
                  minHeight:"520px",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              ><br></br><br></br><br></br><br></br>
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

              <div className="hero-text" style={{ flex: "1 1 300px", maxWidth: "500px", textAlign: "left" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>O que é o Iaçá?</h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                  O Iaçá é uma solução sustentável criada por estudantes do CESUPA para combater o descarte inadequado
                  dos caroços de açaí em Belém do Pará. A plataforma conecta feirantes e empresas, incentivando o reaproveitamento do caroço como matéria-prima
                  e promovendo impacto social e ambiental positivo.
                </p>
                <button
                  onClick={() => navigate("/cadastro")}
                  style={{
                    backgroundColor: "#1d7225",
                    color: "#fff",
                    padding: "0.7rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
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
