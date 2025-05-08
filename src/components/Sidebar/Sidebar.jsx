import "./Sidebar.css";

import avatar from "../../assets/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default Sidebar;
