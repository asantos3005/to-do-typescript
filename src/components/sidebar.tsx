import sidebarIcon from "../assets/sidebarIcon.svg";
import '../styles/sidebar.css'

type SideBarProps = {
  sidebarState: "open" | "closed";
  toggleSideBar: () => void;
};

export default function SideBar({ sidebarState, toggleSideBar }: SideBarProps) {
  return (
    <aside className={`sidebar ${sidebarState === "open" ? "expanded" : "collapsed"}`} id="sidebar">
      <div className="profileMenu">
        <p id="profileLink">Profile</p>
        <img src={sidebarIcon} alt="Toggle Sidebar" onClick={toggleSideBar} className="sidebarToggle clickable" />
      </div>
      <div className="addTaskMenu clickable"><p>Add Task</p></div>
      <div className="todayMenu clickable"><p>Today</p></div>
      <div className="upcomingMenu clickable"><p>Upcoming</p></div>
    </aside>
  );
}

