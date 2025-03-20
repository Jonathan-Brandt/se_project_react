import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avatar.svg";
function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-location">DATE - LOCATION</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__profile-container">
        <p className="header__username">USERNAME</p>
        <img src={avatar} alt="Avatar" className="user__avatar" />
      </div>
    </header>
  );
}

export default Header;
