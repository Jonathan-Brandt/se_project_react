const baseUrl = "http://localhost:3001";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getResponse };

function getItems() {
  return fetch(`${baseUrl}/items`).then(getResponse);
}

export { getItems };

function addCard(cardData, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  }).then(getResponse);
}

export { addCard };

function deleteCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
}

export { deleteCard };

function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
}

export { getUserData };

function updateProfileData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
}

export { updateProfileData };
