import { useParams } from "react-router-dom";

function VisualizarPDF() {
  const { tipo, id } = useParams();

  const urlBase = tipo === "nota"
    ? `http://192.168.15.124:8000/api/pagamento/nota-fiscal/${id}`
    : `http://192.168.15.124:8000/api/pagamento/comprovante/${id}`;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {tipo === "nota" ? "Nota Fiscal" : "Comprovante de Pagamento"}
      </h1>
      <iframe
        src={urlBase}
        title={`PDF - ${tipo}`}
        width="100%"
        height="800px"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}

export default VisualizarPDF;
