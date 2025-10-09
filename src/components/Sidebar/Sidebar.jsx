import "./Sidebar.css";

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
