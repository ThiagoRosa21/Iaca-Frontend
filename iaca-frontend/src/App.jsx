import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";
import EmpresaDashboard from "./pages/EmpresaDashboard.jsx";
import VendedorDashboard from "./pages/VendedorDashboard.jsx";
import MapaDescarte from "./pages/MapaDescarte.jsx";
import HistoricoPagamentos from "./pages/HistoricoPagamentos.jsx";
import HistoricoVendas from "./pages/HistoricoVendas.jsx";
import VisualizarPDF from "./pages/VisualizarPDF.jsx";
import CompraPonto from "./pages/CompraPonto.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Welcome from "./pages/Welcome.jsx";
import Sucesso from "./pages/Sucesso.jsx";
import HistoricoDescartes from "./pages/HistoricoDescartes.jsx";
import ResumoMensalVendedor from "./pages/ResumoMensalVendedor.jsx";
import VerificarEmail from "./pages/VerificarEmail";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirecionar a rota inicial para /cadastro */}
        <Route path="/" element={<Navigate to="/cadastro" replace />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        {/* Rotas privadas para empresas */}
        {user && user.role === "empresa" && (
          <>
            <Route path="/dashboard" element={<RequireAuth user={user}><EmpresaDashboard /></RequireAuth>} />
            <Route path="/mapa" element={<RequireAuth user={user}><MapaDescarte /></RequireAuth>} />
            <Route path="/historico" element={<RequireAuth user={user}><HistoricoPagamentos /></RequireAuth>} />
            <Route path="/pdf/:tipo/:id" element={<RequireAuth user={user}><VisualizarPDF /></RequireAuth>} />
            <Route path="/compra/:pontoId" element={<RequireAuth user={user}><CompraPonto /></RequireAuth>} />
          </>
        )}

        {/* Rotas privadas para vendedores */}
        {user && user.role === "vendedor" && (
          <>
            <Route path="/dashboard" element={<RequireAuth user={user}><VendedorDashboard /></RequireAuth>} />
            <Route path="/mapa" element={<RequireAuth user={user}><MapaDescarte /></RequireAuth>} />
            <Route path="/historico" element={<RequireAuth user={user}><HistoricoVendas /></RequireAuth>} />
            <Route path="/historico-vendedor" element={<RequireAuth user={user}><HistoricoDescartes /></RequireAuth>} />
            <Route path="/ResumoMensalVendedor" element={<RequireAuth user={user}><ResumoMensalVendedor /></RequireAuth>} />
          </>
        )}

        {/* Redirecionamento para rota padrão baseada no login */}
        <Route
          path="*"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
