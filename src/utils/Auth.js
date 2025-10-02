import { getResponse } from "./API";
const BASE_URL = "http://localhost:3001";

export function signup({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(getResponse);
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
}
