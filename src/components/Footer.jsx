import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { useUser } from "../hooks/UserContext";

function Footer() {
  const { user } = useUser(); // קבלת המשתמש מה-Context

  const renderFooterIcons = () => {
    const icons = [];

    // אייקון About (כולם רואים)
    icons.push(
      <Link key="about" to="/about" className="footer-link">
        <i
          className="fa-solid fa-circle-exclamation fa-2xl"
          style={{ color: "#f39c12" }}
        ></i>
        <p className="footer-text">About</p>
      </Link>
    );

    // בדוק אם user קיים לפני גישה למאפיינים שלו
    if (user) {
      // אייקון Favorites (רק למשתמשים מחוברים)
      icons.push(
        <Link key="favorites" to="/favorites" className="footer-link">
          <i className="fa-solid fa-heart fa-2xl" style={{ color: "red" }}></i>
          <p className="footer-text">Favorites</p>
        </Link>
      );

      // אייקון My Cards (רק לאדמין וביזנס)
      if (user.isAdmin || user.isBusiness) {
        icons.push(
          <Link key="mycards" to="/mycards" className="footer-link">
            <i
              className="fa-regular fa-address-card fa-2xl"
              style={{ color: "green" }}
            ></i>
            <p className="footer-text">My Cards</p>
          </Link>
        );
      }
    }

    return icons;
  };

  return (
    <footer className="footer">
      <div className="footer-icon">{renderFooterIcons()}</div>

      {/* טקסט זכויות יוצרים */}
      <p className="footer-copyright">כל הזכויות שמורות &copy; 2025</p>
    </footer>
  );
}

export default Footer;
