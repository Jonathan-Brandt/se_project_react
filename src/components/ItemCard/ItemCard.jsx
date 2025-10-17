import "./ItemCard.css";
function ItemCard({ item, cardClick, handleCardLike }) {
  return (
    <div className="item-card">
      <div className="item-card__name-container">
        <h2 className="item-card__name">{item.name}</h2>
      </div>
      <img
        onClick={() => cardClick(item)}
        onCardLike={handleCardLike}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
