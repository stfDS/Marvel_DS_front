import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {
          withCredentials: true,
        });
        setUser(res.data);
        setUpdate(true);
        console.log(res.data, "fetch");
      } catch (err) {
        console.log("Error loading ,no User found");
      }
    };
    fetchuser();
  }, [update]);

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        user,
        setUser,
        update,
        setUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
