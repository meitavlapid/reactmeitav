import React from "react";
import { useTheme } from "./themeContext";
import { useSearch } from "../hooks/SearchContext";
import { useUser } from "../hooks/UserContext";
import "../css/navbar.css";
import { string } from "yup";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, isAdmin, isBusiness, isUser, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // מעדכן את searchTerm ב-Context
  };

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid ">
        <a className="navbar-brand fw-bold fs-4 " href="/home">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a aria-current="page" href="about#">
                About
              </a>
            </li>
            {isAdmin || isBusiness || isUser || (user && !isAdmin) ? (
              <li className="nav-item">
                <a className="nav-link" href="/favorites">
                  Favorites
                </a>
              </li>
            ) : (
              <></>
            )}
            {isAdmin && isBusiness && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/mycards">
                    My Cards
                  </a>
                </li>
              </>
            )}

            {user && isAdmin && isBusiness && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          <div className="navbarwelcome me-5 ms-5">
            {user ? (
              <h3>Welcome {user?.name?.first || "Guest"}!</h3>
            ) : (
              <h3 className=" fw-bold  me-5 ms-5 mb-0 p-2 text-center">
                Welcome Guest!
              </h3>
            )}
            {isAdmin ? (
              <h4>You are an Admin</h4>
            ) : isBusiness ? (
              <h4>You are a Business User</h4>
            ) : isUser ? (
              <h4>You are aregistered User</h4>
            ) : (
              <></>
            )}
            <div className="navicon">
              {[
                {
                  condition: isAdmin,
                  icon: "fa-user-secret fa-solid  text-primary",

                  className: "navicon1",
                },

                {
                  condition: isBusiness && !isAdmin,
                  icon: "fa-user-tie text-info",
                  className: "navicon",
                  color: "red",
                  style: { color: "red" },
                },
                {
                  condition: isUser && !isAdmin && !isBusiness,
                  icon: "fa-user text-success",
                  className: "navicon",
                },
              ]
                .filter((item) => item.condition)
                .map((item, index) => (
                  <div
                    className="navbar-nav d-flex align-items-center"
                    key={index}
                  >
                    <i className={`fa-solid ${item.icon} me-2`}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
            </div>
          </div>
          <ul className="navbar-nav ms-auto">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange} // מפעיל עדכון חיפוש
              />
            </form>
            {!user ? (
              <>
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
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}

            <i
              className="fa-solid"
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            >
              {theme === "light" ? "Dark" : "Light"}
            </i>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
