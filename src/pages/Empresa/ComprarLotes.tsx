import { useEffect, useState } from 'react';
import { listarLotes } from '../../api/acai';
import React from 'react';

function ComprarLotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    const fetchLotes = async () => {
      const token = localStorage.getItem('token') || '';
      const data = await listarLotes(token);
      setLotes(data);
    };
    fetchLotes();
  }, []);

  return (
    <div>
      <h1>Comprar Lotes</h1>
      <ul>
        {lotes.map((l: any) => (
          <li key={l.id}>{l.quantidade_kg}kg - Vendedor {l.vendedor_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default ComprarLotes;
