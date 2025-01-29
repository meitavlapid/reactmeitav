import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // הסרת הסוגריים כי jwtDecode הוא ייצוא ברירת מחדל
import { getUserById } from "../services/userServices";

export const getUserFromLocalStorage = async () => {
  try {
    const token = localStorage.getItem("token"); // קבלת הטוקן
    if (!token) return null; // אם אין טוקן, החזר null

    const decodedToken = jwtDecode(token); // פענוח הטוקן
    const response = await getUserById(decodedToken._id); // קריאה לשרת
    return { ...response.data, token }; // החזרת פרטי המשתמש
  } catch (error) {
    console.error("Invalid token or user fetch failed:", error);
    return null; // במקרה של טוקן פגום
  }
};
// יצירת הקונטקסט
const UserContext = createContext();

// ה-Hook לשימוש בקונטקסט
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // מצב המשתמש
  const [loading, setLoading] = useState(true); // מצב טעינה

  // פונקציה לטעינת המשתמש
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token); // פענוח הטוקן
      console.log("Decoded token:", decodedToken);

      const userData = await getUserById(decodedToken._id); // קריאה לשרת
      console.log("User data fetched:", userData);

      // וודא שהפונקציה שומרת את התגובה הנכונה
      if (userData) {
        setUser({ ...userData, token }); // שמירת המידע על המשתמש בקונטקסט
        console.log("User updated in context:", { ...userData, token });
      } else {
        console.warn("No user data returned from API.");
        setUser(null);
      }
    } catch (error) {
      console.error("Error in fetchUser:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // טעינת המשתמש בטעינה ראשונית
  useEffect(() => {
    fetchUser();
  }, []);

  // פונקציה להתחברות
  const loginUser = async (token) => {
    try {
      console.log("Token received in loginUser:", token);
      localStorage.setItem("token", token); // שמירת הטוקן ב-localStorage
      await fetchUser(); // טעינת המשתמש מחדש
    } catch (error) {
      console.error("Error in loginUser:", error);
      setUser(null);
    }
  };

  // פונקציה להתנתקות
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        loginUser,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
