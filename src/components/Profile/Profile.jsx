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
  isLoggedIn,
}) {
  return (
    <div className="Profile">
      <section className="profile__sidebar">
        <Sidebar onEditClick={onEditClick} onSignoutClick={onSignoutClick} />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddButtonClick={onAddButtonClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
