import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const SignupFom = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          username: username,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (closeModal) {
        closeModal();
      }

      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="user"
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        value={username}
      />

      <input
        type="email"
        id="email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <div className="submit">
        <input type="submit" value="Signup" />
      </div>
    </form>
  );
};
