import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // certifique-se de ter essa imagem

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-400 text-purple-900 px-6">
      <img src={logo} alt="Logo Iacá" className="w-24 h-24 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Bem-vindo ao iaca-app</h1>
      <p className="text-lg mb-6">Escolha seu perfil para continuar:</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/login?vendedor")}
          className="bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Vendedor de Açaí
        </button>
        <button
          onClick={() => navigate("/login?empresa")}
          className="bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Empresa Reutilizadora
        </button>
      </div>
    </div>
  );
}
