import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyCardsPage from "./components/MyCardsPage";

import Admin from "./components/Admin";
import About from "./components/About";

import "./App.css";
import Footer from "./components/Footer";
import Notfound from "./components/NotFound";
import CreateCard from "./components/CreateCard";
import CardDetails from "./components/CardDetails";

function App() {
  const user = null;

  return (
    <>
      <Router>
        <div>
          <Navbar user={user} />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/createcard/:id" element={<CardDetails />} />
            <Route
              path="/login"
              element={
                <LoginPage
                // setUser={setUser}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-cards" element={<MyCardsPage />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/my-cards"
              element={user ? <MyCardsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                user && user.role === "admin" ? (
                  <AdminPage />
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
    </>
  );
}

export default App;
