import Modal from "react-modal";

import { LoginForm } from "./LoginForm";
import { useState } from "react";

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
  overlay: {
    backgroundColor: "none",
  },
};

const ModalLogin = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

        <LoginForm closeModal={closeModal} />

        <button className="btn-modal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalLogin;
