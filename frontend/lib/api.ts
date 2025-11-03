import axios from "axios";

/**
 * Detecta automaticamente se está em ambiente local ou produção.
 * Usa a variável NEXT_PUBLIC_API_URL definida no .env.local (Vercel).
 */

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // fallback para ambiente local

export const api = axios.create({
  baseURL: `${baseURL}`, // prefixo do backend FastAPI
  headers: {
    "Content-Type": "application/json",
  },
});
