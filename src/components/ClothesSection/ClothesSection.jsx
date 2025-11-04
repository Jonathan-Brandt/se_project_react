import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddButtonClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const myItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__caption">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={onAddButtonClick}
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__list">
        {myItems.map((item) => {
          return (
            <ItemCard
              isLoggedIn={isLoggedIn}
              key={item._id}
              item={item}
              cardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
