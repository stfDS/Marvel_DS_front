import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalSigup from "./ModalSignup";
import Logout from "./Logout";
import ReactModal from "react-modal";
import { useContext } from "react";
import { AuthContext } from "../context/connect.provider";
ReactModal.setAppElement("#root");

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

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
            <Link to="/characters">Characters</Link>
          </div>
          <div>
            <Link to="/comics">Comics</Link>
          </div>
          <div>
            <Link to="/favorites">Favorites</Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="header-log">
            <Logout />
          </div>
        ) : (
          <div className="header-log">
            <ModalLogin />
            <ModalSigup />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
