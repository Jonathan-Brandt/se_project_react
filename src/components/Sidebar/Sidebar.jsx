import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ onEditClick, onSignoutClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__info-container">
        <div className="sidebar__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Default Avatar"
            className="sidebar__avatar"
          />
        </div>
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button className="openEditModalButton" onClick={onEditClick}>
          Change profile data
        </button>
        <button className="signout-button" onClick={onSignoutClick}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
