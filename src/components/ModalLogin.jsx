import axios from "axios";
import Modal from "react-modal";
import { useContext, useState } from "react";
import { AuthContext } from "../context/connect.provider";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "20%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#35363a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // overlay: {
  //   backgroundColor: "",
  // },
};

const ModalLogin = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
      closeModal();
    } catch (error) {
      toast.error("incorrect parameters");
    }
  };

  return (
    <div>
      <button className="btn-modal" onClick={openModal}>
        Login
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3
          className="description-title
        "
        >
          Login
        </h3>

        <div>
          <form>
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
          </form>
        </div>
        <input type="submit" onClick={handleSubmit} />
        <button className="btn-modal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalLogin;
