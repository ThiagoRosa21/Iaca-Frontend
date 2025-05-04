import api from './index';

export async function criarLote(token: string, data: { quantidade_kg: number }) {
  const response = await api.post('/acai/lotes', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function listarLotes(token: string) {
  const response = await api.get('/acai/lotes', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
