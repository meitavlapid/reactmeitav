import React from "react";

import { useTheme } from "./themeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav className="navbar navbar-expand ">
        <div className="container-fluid m-3">
          <a className="navbar-brand" href="home#">
            MLapid
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a aria-current="page" href="about#">
                  about
                </a>
              </li>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

              <li className="nav-item">
                <a className="nav-link" href="register#">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login#">
                  Login
                </a>
              </li>
              <i
                class="fa-solid "
                onClick={toggleTheme}
                style={{ cursor: "pointer" }}
              >
                {theme === "light" ? "Dark" : "Light"}
              </i>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
