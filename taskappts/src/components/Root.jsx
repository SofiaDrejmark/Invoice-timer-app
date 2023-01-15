import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {GoHome} from "react-icons/Go";

function Root() {
  return (
    <header>
      <nav className="homeRoot">
        <NavLink to="/">
          <GoHome/>
          <h2 className="invoiceH2">Invoices</h2>
        </NavLink>
      </nav>
      <nav className="rootNav">
        <ul>
          <li>
            <NavLink to="/new">
              <h4> Create new invoice</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/timelogs">
              <h4> Timer</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              <h4> Projects</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar">
              <h4>Timelogs</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/invoicelist">
              <h4>Invoices</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <h4> Tasks</h4>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Root;
