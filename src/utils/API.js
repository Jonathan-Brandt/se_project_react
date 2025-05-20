const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems };

function addCard(cardData) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  })
    .then((res) => res.json())
    .then((newCard) => setCards((prevCards) => [...prevCards, newCard]));
}

export { addCard };

function deleteCard(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
  }).then(() => prevCards.filter((card) => card._id !== cardId));
}

export { deleteCard };
