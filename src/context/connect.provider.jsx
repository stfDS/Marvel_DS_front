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
        const res = await axios.get(
          "https://site--marvel-ds--5gjnlvwzlmps.code.run/refresh",
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
        setUpdate(true);
      } catch (err) {
        console.log("Error loading favorites");
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
