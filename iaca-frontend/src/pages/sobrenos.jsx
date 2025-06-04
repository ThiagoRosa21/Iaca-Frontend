import React from "react";
import logo from "../assets/logo.png";

export default function SobreNos() {
  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#fcd116",
        minHeight: "90vh",
        padding: "4rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 1s ease-in-out"
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div
        className="card"
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          padding: "3rem",
          maxWidth: "900px",
          width: "100%",
          color: "#000",
          textAlign: "justify",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Logo centralizada */}
        <img src={logo} alt="Logo Iaçá" style={{ height: "80px", marginBottom: "1rem" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" }}>
          Sobre o Iaçá
        </h1>

        {/* Texto */}
        <p style={{ fontSize: "1.15rem", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          O <strong>Iaçá</strong> é uma solução sustentável idealizada por estudantes do CESUPA que visa transformar o descarte dos caroços de açaí em uma oportunidade de impacto social, ambiental e econômico.
        </p>

        <p style={{ fontSize: "1.15rem", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          Por meio de um aplicativo intuitivo, conectamos feirantes e vendedores de açaí a empresas que reutilizam os caroços como matéria-prima em setores como agricultura, indústria e cosméticos. O app também mapeia pontos de coleta e promove capacitações com recompensas, integrando-se ao programa <strong>Selo Verde</strong> da Prefeitura de Belém.
        </p>

        <p style={{ fontSize: "1.15rem", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          Nosso objetivo é fomentar a <strong>economia circular</strong>, valorizar o conhecimento local e oferecer ferramentas para um futuro mais limpo e colaborativo — onde inovação e responsabilidade caminham juntas.
        </p>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          Com o Iaçá, acreditamos que cada descarte correto é um passo em direção a uma cidade mais conectada com o meio ambiente e com seu povo.
        </p>
      </div>
    </div>
  );
}
