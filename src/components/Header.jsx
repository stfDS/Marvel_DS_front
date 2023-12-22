import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import Logout from "./Logout";

import ModalSigup from "./ModalSignup";

import { useContext } from "react";
import { AuthContext } from "../context/connect.provider";

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
            <Link to="/">Characters</Link>
          </div>
          <div>
            <Link to="/comics">Comics</Link>
          </div>
          <div>
            <Link to="/favorites">Favoris</Link>
          </div>
          <div>
            {isAuthenticated === false ? (
              <div>
                <ModalSigup />
                <ModalLogin />
              </div>
            ) : (
              <Logout />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
