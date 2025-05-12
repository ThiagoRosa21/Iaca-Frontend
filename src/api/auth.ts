const BASE_URL = "http://localhost:8000";

export async function login(email: string, senha: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) throw new Error("Login inválido");
  return await response.json();
}
