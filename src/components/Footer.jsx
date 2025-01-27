import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { useUser } from "../hooks/UserContext";

function Footer() {
  const { user, isAdmin, isBisser, isUser } = useUser();
  return (
    <footer className="footer">
      <div className="footer-icon">
        {/* אייקון סימן קריאה */}
        <Link to="/about" className="footer-link">
          <i
            className="fa-solid fa-circle-exclamation fa-2xl"
            style={{ color: "#f39c12" }}
          ></i>
          <p className="footer-text">About</p>
        </Link>

        {/* אייקון לב */}
        {isUser && isAdmin && isBisser && (
          <Link to="/favorites" className="footer-link">
            <i
              className="fa-solid fa-heart fa-2xl"
              style={{ color: "red" }}
            ></i>
            <p className="footer-text">Favorites</p>
          </Link>
        )}

        {/* אייקון כרטיס */}
        {isBisser && isAdmin && (
          <Link to="/mycards" className="footer-link">
            <i
              className="fa-regular fa-address-card fa-2xl"
              style={{ color: "green" }}
            ></i>
            <p className="footer-text">My Cards</p>
          </Link>
        )}
      </div>

      {/* טקסט זכויות יוצרים */}
      <p className="footer-copyright">כל הזכויות שמורות &copy; 2023</p>
    </footer>
  );
}

export default Footer;
