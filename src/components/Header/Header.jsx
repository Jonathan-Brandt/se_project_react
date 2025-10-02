import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  currentUser,
  onAddButtonClick,
  weatherData,
  isLoggedIn,
  onSignupClick,
  onLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="header logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <ul className="loggedin_nav-container">
          <button
            onClick={onAddButtonClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile">
            <div className="header__profile-container">
              <p className="header__username">USERNAME</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="user__avatar"
                />
              ) : (
                <div>{currentUser.name[0].toUpperCase()}</div>
              )}
            </div>
          </Link>
        </ul>
      ) : (
        <ul className="not-loggedin_nav-container">
          <button className="header__signup-button" onClick={onSignupClick}>
            Sign Up
          </button>
          <button className="header__login-button" onClick={onLoginClick}>
            Log In
          </button>
        </ul>
      )}
    </header>
  );
}

export default Header;
