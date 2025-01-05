import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer">
        <p>כל הזכויות שמורות &copy; 2023</p>

        <div className="social-icons">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <p>
          <a href="#">צור קשר</a> | <a href="#">פרטי האתר</a> |{" "}
          <a href="#">מדיניות האתר</a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
