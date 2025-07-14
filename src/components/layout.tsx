import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import sidebarIcon from "../assets/sidebarIcon.svg";

export default function Layout() {
  const [sidebarState, setSidebarState] = useState<"open" | "closed">("open");

  function toggleSideBar() {
    const newState = sidebarState === "open" ? "closed" : "open";
    setSidebarState(newState);
    console.log("Sidebar toggled:", newState);
  }

  return (
    <div className="app-container">
      <SideBar sidebarState={sidebarState} toggleSideBar={toggleSideBar} />
      {sidebarState === "closed" && (
      <div>
        <img
          className="mainSbToggle"
          src={sidebarIcon}
          onClick={toggleSideBar}
          alt="Toggle Sidebar"
        />
      </div>
    )}


      {/* 👇 This is where the child routes will render */}
      <Outlet context={{ sidebarState, toggleSideBar }} />

    </div>
  );
}