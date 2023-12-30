import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { SignupForm } from "./SignupForm";

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Toaster />
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
          Signup
        </h3>

        <SignupForm closeModal={closeModal} />

        <button className="btn-modal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalSigup;
