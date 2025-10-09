import "./Sidebar.css";

import avatar from "../../assets/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src={currentUser.avatar}
        alt="Default Avatar"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default Sidebar;
