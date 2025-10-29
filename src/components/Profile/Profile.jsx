import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  onCardClick,
  clothingItems,
  onAddButtonClick,
  onEditClick,
  onSignoutClick,
  onCardLike,
}) {
  return (
    <div className="Profile">
      <section className="profile__sidebar">
        <Sidebar onEditClick={onEditClick} />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddButtonClick={onAddButtonClick}
          onSignoutClick={onSignoutClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
