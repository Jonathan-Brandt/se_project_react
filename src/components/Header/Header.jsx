import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avatar.svg";
function Header({ onAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="header logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={onAddButtonClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__profile-container">
        <p className="header__username">USERNAME</p>
        <img src={avatar} alt="Avatar" className="user__avatar" />
      </div>
    </header>
  );
}

export default Header;
