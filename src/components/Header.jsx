import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalSigup from "./ModalSignup";
import Logout from "./Logout";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

const Header = () => {
  return (
    <header>
      <div className="container top">
        <div className="logo-top">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1700125515/Marvel/logo_Marvel_dtiv81.png"
              alt="logo marvel"
            />
          </Link>
        </div>
        <div className="top-nav">
          <div>
            <Link to="/">Personnages</Link>
          </div>
          <div>
            <Link to="/comics">Comics</Link>
          </div>
          <div>
            <Link to="/favorites">Favoris</Link>
          </div>
          <ModalLogin />
          <ModalSigup />
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
