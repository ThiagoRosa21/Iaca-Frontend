import { useState } from 'react';
import { criarLote } from '../../api/acai';
import React from 'react';

function CadastroLote() {
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token') || '';
    const data = await criarLote(token, { quantidade_kg: Number(quantidade) });
    alert('Lote cadastrado!');
  };

  return (
    <div>
      <h1>Cadastrar Lote</h1>
      <input placeholder="Quantidade em KG" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
      <button onClick={handleSubmit}>Cadastrar</button>
    </div>
  );
}

export default CadastroLote;
