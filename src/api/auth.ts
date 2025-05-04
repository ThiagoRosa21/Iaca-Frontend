import api from './index';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { username: email, password });
  return response.data;
}
