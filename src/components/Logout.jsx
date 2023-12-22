import { useContext } from "react";

import axios from "axios";
import { AuthContext } from "../context/connect.provider";

const Logout = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.delete(
        "https://site--marvel-ds--5gjnlvwzlmps.code.run/logout",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
