import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/themeContext";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyCardsPage from "./components/MyCardsPage";
import Admin from "./components/Admin";
import About from "./components/About";
import Footer from "./components/Footer";
import Notfound from "./components/NotFound";
import CardDetails from "./components/CardDetails";
import "./App.css"; // כאן יש את ה-CSS שלך

function App() {
  const [theme, setTheme] = useState("light");

  // איפוס הנושא עם טעינת הדף
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light"); // ברירת מחדל
    }
  }, []);

  // שינוי הנושא
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // שמירה ב-localStorage
  };

  const user = null;

  return (
    <>
      <ThemeProvider>
        <Router>
          <div>
            <Navbar user={user} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/createcard/:id" element={<CardDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/my-cards"
                element={user ? <MyCardsPage /> : <Navigate to="/login" />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/admin"
                element={
                  user && user.role === "admin" ? (
                    <Admin />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="*" element={<Notfound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
