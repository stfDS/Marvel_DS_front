import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/connect.provider";
import toast from "react-hot-toast";

const Logout = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/logout`);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      toast.error("Error disconnecting");
    }
  };

  return (
    <button className="btn-modal" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
