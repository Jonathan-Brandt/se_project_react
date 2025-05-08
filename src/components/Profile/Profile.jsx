import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile() {
  return (
    <div className="Profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
