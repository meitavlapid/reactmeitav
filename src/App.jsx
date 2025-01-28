import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./components/themeContext";
import { SearchProvider } from "./hooks/SearchContext";
import { UserProvider } from "./hooks/UserContext";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyCardsPage from "./components/MyCardsPage";
import LikedCardsPage from "./components/Favorites";
import UserProfile from "./components/MyInfo";
import About from "./components/About";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import CardDetails from "./components/CardDetails";
import EditCardForm from "./components/EditCardForm";
import CreateCard from "./components/CreateCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const AppContent = ({ user, toggleTheme, handleSearch, allCards }) => {
  const location = useLocation(); // שימוש בתוך רכיב פנימי בתוך Router
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <Navbar
          user={user || { name: "Guest" }}
          toggleTheme={toggleTheme}
          onSearch={handleSearch}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* הפנייה ברירת מחדל */}
        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          path="/home"
          element={<HomePage user={user || { name: "Guest" }} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/createcard/:id" element={<CardDetails />} />
        <Route path="/createcard" element={<CreateCard />} />
        <Route path="/mycards" element={<MyCardsPage />} />
        <Route path="/favorites" element={<LikedCardsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/editcard/:id" element={<EditCardForm />} />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? <Admin /> : <Navigate to="/home" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const user = null; // משתמש ברירת מחדל - אורח

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setCards(allCards.slice(0, 6));
    } else {
      const filteredCards = allCards.filter(
        (card) =>
          card.title.toLowerCase().includes(term.toLowerCase()) ||
          card.description.toLowerCase().includes(term.toLowerCase())
      );
      setCards(filteredCards.slice(0, 6));
    }
  };

  return (
    <Router>
      <UserProvider>
        <ThemeProvider>
          <SearchProvider>
            <AppContent
              user={user}
              toggleTheme={toggleTheme}
              handleSearch={handleSearch}
              allCards={allCards}
            />
          </SearchProvider>
        </ThemeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
