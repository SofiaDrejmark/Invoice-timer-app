import React from "react";
import { NavLink } from "react-router-dom";

function OverwiewNav() {
  return (
    <div>

      <nav className="overwiewNav">
        <ul>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/tasks">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/invoicelist">Invoices</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default OverwiewNav;
