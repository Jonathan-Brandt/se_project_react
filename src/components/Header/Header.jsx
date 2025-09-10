import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onAddButtonClick, weatherData, isLoggedIn }) {
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
      {isLoggedIn ? (
        <ul classname="nav-container">
          <ToggleSwitch />
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
              <img src={avatar} alt="Avatar" className="user__avatar" />
            </div>
          </Link>
        </ul>
      ) : (
        <ul classname="nav-container">
          <ToggleSwitch />
          <button onClick={onSignupClick} classname="signup__button">
            Sign Up
          </button>
          <button onClick={onLoginClick} className="login__button">
            Log In
          </button>
        </ul>
      )}
    </header>
  );
}

export default Header;
