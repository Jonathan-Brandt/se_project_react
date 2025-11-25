import { getResponse } from "./API";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrjb.jumpingcrab.com"
    : "http://localhost:3001";

export function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(getResponse);
}

export function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
}
