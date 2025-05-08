import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__caption">Your items</p>
        <button> Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          <ItemCard
            key={item._id}
            item={item}
            //pass as prop
            //cardClick={onCardClick}
          />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
