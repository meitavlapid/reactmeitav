import React from "react";
import { useTheme } from "./themeContext";
import { useSearch } from "../hooks/SearchContext";
import { useUser } from "../hooks/UserContext";
import "../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, isAdmin, isBusiness, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // מעדכן את searchTerm ב-Context
  };

  // פונקציה ליצירת הקישורים בהתאם לסוג המשתמש
  const renderNavLinks = () => {
    const links = [
      {
        condition: true, // כולם רואים את About
        label: "About",
        to: "/about",
      },
      {
        condition: user, // משתמשים מחוברים רואים את Favorites
        label: "Favorites",
        to: "/favorites",
      },
      {
        condition: user?.isAdmin || user?.isBusiness, // רק אדמין או ביזנס רואים את My Cards
        label: "My Cards",
        to: "/mycards",
      },
      {
        condition: user, // כל משתמש מחובר רואה את Profile
        label: "Profile",
        to: "/profile",
      },
    ];

    return links
      .filter((link) => link.condition) // מסנן רק את הקישורים שצריכים להופיע
      .map((link, index) => (
        <li key={index} className="nav-item">
          <Link className="nav-link" to={link.to}>
            {link.label}
          </Link>
        </li>
      ));
  };
  const renderUserIcon = () => {
    if (!user) {
      return (
        <i
          className="fa-solid fa-user fa-2xl text-secondary"
          title="Guest"
          style={{ marginRight: "10px" }}
        ></i>
      );
    }

    if (user?.isAdmin) {
      return (
        <i
          className="fa-solid fa-user-shield fa-2xl text-primary"
          title="Admin"
          style={{ marginRight: "10px" }}
        ></i>
      );
    }

    if (user?.isBusiness) {
      return (
        <i
          className="fa-solid fa-user-tie fa-2xl text-info"
          title="Business User"
          style={{ marginRight: "10px" }}
        ></i>
      );
    }

    return (
      <i
        className="fa-solid fa-user fa-2xl text-success"
        title="Registered User"
        style={{ marginRight: "10px" }}
      ></i>
    );
  };
  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid  ">
        {/* לוגו */}
        <Link className="navbar-brand fw-bold fs-4" to="/home">
          MLapid
        </Link>

        {/* תפריט ניווט */}
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
          {/* קישורים דינמיים */}
          <ul className="navbar-nav">{renderNavLinks()}</ul>

          {/* טקסט ברוך הבא */}
          <div className="navbarwelcome d-flex align-items-center me-5 ms-5">
            {renderUserIcon()}
            <h3>Welcome {user?.name?.first || "Guest"}!</h3>
            {user?.isAdmin && <h4>You are an Admin</h4>}
            {user?.isBusiness && !user?.isAdmin && (
              <h4>You are a Business User</h4>
            )}
            {!user?.isAdmin && !user?.isBusiness && user && (
              <h4>You are a Registered User</h4>
            )}
          </div>

          {/* חיפוש */}
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange} // מפעיל עדכון חיפוש
            />
          </form>

          {/* התחברות/התנתקות */}
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* החלפת נושא */}
          <i
            className="fa-solid"
            onClick={toggleTheme}
            style={{ cursor: "pointer" }}
          >
            {theme === "light" ? "Dark" : "Light"}
          </i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
