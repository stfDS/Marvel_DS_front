import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";

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

const ModalSigup = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleSignup = async (event) => {
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
      console.log(response.data);
      // closeModal();

      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn-modal" onClick={openModal}>
        Signup
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
          sign
        </h3>

        <div>
          <form>
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
              type=" email"
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
        <input type="submit" onClick={handleSignup} />
        <button className="btn-modal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalSigup;
