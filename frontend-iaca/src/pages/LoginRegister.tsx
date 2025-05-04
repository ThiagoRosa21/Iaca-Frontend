import React, { useState } from 'react';
import axios from 'axios';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:8000/auth/login', { email, password });
        alert(`Login realizado: ${res.data.access_token}`);
      } else {
        await axios.post('http://localhost:8000/users/', { name, email, password });
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao processar a solicitação');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: 'block', marginBottom: 10, width: '100%' }}
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <p style={{ marginTop: 10, color: 'red' }}>{error}</p>
      <button onClick={toggleForm} style={{ marginTop: 10, width: '100%' }}>
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>
    </div>
  );
};

export default LoginRegister;
