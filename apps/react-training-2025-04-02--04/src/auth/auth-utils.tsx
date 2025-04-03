import sha256 from 'crypto-js/sha256';

const API_URL = 'http://localhost:9000';

const generateAuthHeader = (email: string, password: string) =>
  `Basic ${email}:${sha256(password)}`;

export const register = (email: string, password: string) =>
  fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { authorization: generateAuthHeader(email, password) },
  }).catch((err) => console.error(err));

export const login = (email: string, password: string) => Promise.resolve()
