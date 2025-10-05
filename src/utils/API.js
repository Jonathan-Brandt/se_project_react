const baseUrl = "http://localhost:3001";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getResponse };

function getItems() {
  return fetch(`${baseUrl}/items`).then(getResponse);
}

export { getItems };

function addCard(cardData) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then(getResponse);
}

export { addCard };

function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
  }).then(getResponse);
}

export { deleteCard };

function getUserData(token) {
  return fetch(`${baseUrl}/users/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { getUserData };
