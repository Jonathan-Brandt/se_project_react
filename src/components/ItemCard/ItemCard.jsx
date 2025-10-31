import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, cardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  console.log("debug info:", {
    itemName: item.name,
    itemLikes: item.likes,
    currentUserId: currentUser?._id,
    isLiked: isLiked,
  });
  const itemLikeButtonClassName = `like-button ${
    isLiked ? "like-button__active" : "like-button"
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };
  return (
    <div className="item-card">
      <div className="item-card__name-container-1">
        <div className="item-card__name-container-2">
          <h2 className="item-card__name">{item.name}</h2>
        </div>
        {isLoggedIn && (
          <div className="like-button__container">
            <button
              className={itemLikeButtonClassName}
              type="button"
              onClick={handleLike}
            ></button>
          </div>
        )}
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
