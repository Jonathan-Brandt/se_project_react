import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          src={currentUser.avatar}
          alt="Default Avatar"
          className="sidebar__avatar"
        />
      </div>
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default Sidebar;
