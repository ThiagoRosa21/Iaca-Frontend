import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sucesso() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente após 2 segundos
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pagamento-container">
      <div className="pagamento-card">
        <h1 className="pagamento-title">Pagamento realizado com sucesso!</h1>
        <p className="text-center mt-4">Redirecionando para o início...</p>
      </div>
    </div>
  );
}

export default Sucesso;