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
  overlay: {
    backgroundColor: "",
  },
};

const ModalDescription = ({ title, description }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="all-comics-description">
      <button className="btn-modal" onClick={openModal}>
        Description
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Description"
      >
        <h3
          className="description-title
        "
        >
          {title}
        </h3>

        <div className="description-modal-text">
          <p>{description}</p>
        </div>

        <button className="btn-modal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalDescription;
