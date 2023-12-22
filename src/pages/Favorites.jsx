import { useContext } from "react";

import { AuthContext } from "../context/connect.provider";

const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="container">
      <h1>Favorites</h1>
    </div>
  ) : (
    <div className="container">
      <h1>login</h1>
    </div>
  );
};

export default Favorites;
