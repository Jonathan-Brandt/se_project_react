import "./ItemCard.css";
function ItemCard({ item, cardClick, handleCardLike }) {
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    handleCardLike({ id: item._id, isLiked });
  };
  return (
    <div className="item-card">
      <div className="item-card__name-container">
        <h2 className="item-card__name">{item.name}</h2>
      </div>
      <img
        onClick={() => cardClick(item)}
        handleLike={() => handleLike(item)}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
