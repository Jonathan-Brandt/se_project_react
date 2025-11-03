import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddButtonClick,
  handleCardLike,
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
              key={item._id}
              item={item}
              cardClick={onCardClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
