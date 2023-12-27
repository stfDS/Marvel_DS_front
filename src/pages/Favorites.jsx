import { useContext } from "react";
import { AuthContext } from "../context/connect.provider";

import { LoginForm } from "../components/LoginForm";
import { SignupFom } from "../components/SignupFom";

const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <div className="container">
      <h1>Favorites</h1>
    </div>
  ) : (
    <section className="log-fav">
      <div className="log-fav-div">
        <h1>Login</h1>
        <LoginForm />
      </div>
      <div className="log-fav-div">
        <h1>Signup</h1>
        <SignupFom />
      </div>
    </section>
  );
};

export default Favorites;
