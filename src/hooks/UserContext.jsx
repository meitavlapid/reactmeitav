import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../services/userServices";

export const getUserFromLocalStorage = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(jwtDecode(token).isAdmin);

    const decodedToken = jwtDecode(token);
    const user = await getUserById(decodedToken._id); // קריאה לשרת עבור פרטי המשתמש
    return user;
    // return await getUserById(jwtDecode(token)._id);
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // במקרה של טוקן פגום
  }
};

// יצירת הקונטקסט
const UserContext = createContext();

// ה-Hook לשימוש בקונטקסט
export const useUser = () => useContext(UserContext);

// ספק למשתמשים
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage); // המשתמש המחובר

  // התחברות משתמש
  const loginUser = () => {
    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser); // עדכון מצב המשתמש
      localStorage.setItem("token", token); // שמירת הטוקן
    } catch (error) {
      console.error("Error in loginUser:", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // בדיקת חיבור לאחר רענון
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUserFromLocalStorage();
      setUser(storedUser);
    };

    fetchUser();
  }, []);

  // ערכים בקונטקסט
  const value = {
    user,
    setUser,
    // loginUser,
    logoutUser,
    isAdmin: user?.isAdmin || false,
    isBusiness: user?.isBusiness || false,
    isUser: user?.isUser || false,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
