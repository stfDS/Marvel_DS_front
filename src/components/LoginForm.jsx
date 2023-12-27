import { useContext, useState } from "react";
import { AuthContext } from "../context/connect.provider";
import axios from "axios";
import toast from "react-hot-toast";

export const LoginForm = ({ closeModal }) => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      setUser(response.data);
      console.log(response.data);
      toast.success(`Connected, Welcome ${response.data.account.username}`);
      if (closeModal) {
        closeModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        id="email-log"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
      />
      <input
        type="password"
        id="password-log"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <div className="submit">
        <input type="submit" value="login" />
      </div>
    </form>
  );
};
