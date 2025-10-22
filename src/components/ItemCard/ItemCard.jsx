import "./ItemCard.css";

function ItemCard({ item, cardClick, handleCardLike }) {
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const itemLikeButtonClassName = `...`;

  const handleLike = (e) => {
    e.stopPropagation();
    handleCardLike({ id: item._id, isLiked });
  };
  return (
    <div className="item-card">
      <div className="item-card__name-container">
        <h2 className="item-card__name">{item.name}</h2>
      </div>
      <div className="like-button__container">
        <button
          handleLike={() => handleLike(item)}
          className="like-button"
          type="button"
        ></button>
      </div>
      <img
        onClick={() => cardClick(item)}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
