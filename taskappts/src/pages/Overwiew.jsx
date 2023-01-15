import React from "react";
import { Outlet } from "react-router-dom";
import OverwiewNav from "../components/OverweiwNav";

function Overwiew() {
  return (
    <div>
      <Outlet />
      <OverwiewNav />
    </div>
  );
}

export default Overwiew;
