
const API_URL = `${import.meta.env.VITE_API_URL}/User`;

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json(); // { token, user }
};