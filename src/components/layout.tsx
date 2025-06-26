import { useState, } from "react";
import SideBar from "./sidebar";
import React from "react";

interface SidebarProps {
  sidebarState: "open" | "closed";
  toggleSideBar: () => void;
}


export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarState, setSidebarState] = useState<"open" | "closed">("open");
    
    function toggleSideBar() {
        const newState = sidebarState === "open" ? "closed" : "open";
        setSidebarState(newState);
        console.log("Sidebar toggled:", newState);
    }

  return (
    <div className="app-container">
      <SideBar sidebarState={sidebarState} toggleSideBar={toggleSideBar} />
      {React.cloneElement(children as React.ReactElement<SidebarProps>, {
        sidebarState,
        toggleSideBar,
        })}

    </div>
  );
}